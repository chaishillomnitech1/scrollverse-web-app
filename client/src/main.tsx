import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

const isRateLimitError = (error: unknown) =>
  error instanceof TRPCClientError && /request limit reached|too many requests/i.test(error.message);

const jsonSafeTrpcFetch: typeof globalThis.fetch = async (input, init) => {
  const response = await globalThis.fetch(input, {
    ...(init ?? {}),
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return response;

  const text = await response.text();
  const message = response.status === 429
    ? "Request limit reached. Please wait a moment and try again."
    : text || `Request failed with status ${response.status}.`;

  return new Response(JSON.stringify([{
    error: {
      json: {
        message,
        code: response.status === 429 ? -32029 : -32603,
        data: {
          code: response.status === 429 ? "TOO_MANY_REQUESTS" : "INTERNAL_SERVER_ERROR",
          httpStatus: response.status,
        },
      },
    },
  }]), {
    status: response.status,
    statusText: response.statusText,
    headers: { "content-type": "application/json" },
  });
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    if (isRateLimitError(error)) {
      console.warn("[API Query Rate Limit] Request limit reached; retry after a short pause.");
      return;
    }
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    if (isRateLimitError(error)) {
      console.warn("[API Mutation Rate Limit] Request limit reached; retry after a short pause.");
      return;
    }
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch: jsonSafeTrpcFetch,
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
