export type ConnectorState = "CONNECTED" | "AVAILABLE" | "OWNER AUTHORIZATION REQUIRED" | "LOGIN REQUIRED" | "NOT AUTHENTICATED" | "PARENT-ONLY" | "READ-ONLY";

export type ConnectorCapability = {
  id: string;
  name: string;
  connector: string;
  connectsTo: string;
  canDo: string;
  state: ConnectorState;
  adminUrl?: string;
};

const connected: ConnectorState = "CONNECTED";
const available: ConnectorState = "AVAILABLE";
const ownerAuth: ConnectorState = "OWNER AUTHORIZATION REQUIRED";
const loginRequired: ConnectorState = "LOGIN REQUIRED";
const readOnly: ConnectorState = "READ-ONLY";
const parentOnly: ConnectorState = "PARENT-ONLY";

const entries: Array<[string, string, string, string, ConnectorState, string?]> = [
  ["manus-webdev", "WebDev project control", "Manus WebDev", "init, inspect, build, debug, checkpoint, and restore the local project", connected],
  ["manus-browser", "Stateful browser", "Manus browser", "inspect dynamic pages and perform browser workflows when authorized", available],
  ["manus-media", "Media generation", "Manus media tools", "generate and edit images, video, speech, music, and 3D assets", available],
  ["manus-tasks", "Task coordination", "Manus Tasks", "find, organize, share, archive, and message authorized tasks", available],
  ["gmail", "Mail", "Gmail", "search, read, draft, and send mail", loginRequired],
  ["google-calendar", "Calendar", "Google Calendar", "read and manage events and schedules", connected],
  ["outlook-mail", "Mail", "Outlook Mail", "search, read, draft, and send mail", connected],
  ["outlook-calendar", "Calendar", "Outlook Calendar", "read and manage events and schedules", connected],
  ["session-reference", "Past task records", "Authorized Manus sessions", "locate and read permitted prior task material", readOnly],
  ["hubspot", "CRM", "HubSpot", "search and manage contacts, companies, deals, and tickets", ownerAuth],
  ["intercom", "Support conversations", "Intercom", "search, retrieve, and manage conversations and contacts", ownerAuth],
  ["sentry", "Error monitoring", "Sentry", "inspect issues, projects, teams, and root-cause evidence", ownerAuth],
  ["todoist", "Tasks", "Todoist", "find, create, complete, and organize tasks", ownerAuth],
  ["minimax", "Generative media", "MiniMax", "create audio, voices, images, video, and music", ownerAuth],
  ["xero", "Accounting", "Xero", "query invoices, contacts, accounts, payroll, and reports", ownerAuth],
  ["neon", "Postgres database", "Neon", "manage projects, branches, SQL, and schema changes", ownerAuth],
  ["linear", "Issue tracking", "Linear", "find, create, update, and plan issues and projects", ownerAuth],
  ["webflow", "CMS and sites", "Webflow", "manage sites, pages, CMS, components, code, and publication", ownerAuth],
  ["paypal", "Business payments", "PayPal for Business", "manage transactions, invoices, and account operations", ownerAuth],
  ["asana", "Work management", "Asana", "manage tasks, projects, goals, and teams", ownerAuth],
  ["wix", "Site operations", "Wix", "query and manage sites, contacts, orders, and products", ownerAuth],
  ["airtable", "Structured records", "Airtable", "read, search, update records, and manage tables", ownerAuth],
  ["stripe", "Billing and payments", "Stripe", "manage customers, products, prices, invoices, payments, and refunds", ownerAuth],
  ["cloudflare", "Edge infrastructure", "Cloudflare Workers Bindings", "manage Workers, KV, R2, D1, and Hyperdrive", ownerAuth],
  ["hugging-face", "AI research", "Hugging Face Hub", "search models, datasets, papers, and documentation", ownerAuth],
  ["heygen", "Avatar video", "HeyGen", "generate avatar videos with voices and gestures", ownerAuth],
  ["higgsfield", "Cinematic production", "Higgsfield Inc.", "Generate cinematic images, videos, character-consistent assets, and campaign-ready visuals; first-use authorization may be required", available],
  ["zapier", "Automation", "Zapier", "search connected apps and execute configured workflows", ownerAuth],
  ["prisma-postgres", "Managed Postgres", "Prisma Postgres", "inspect tables, query SQL, backups, and migrations", ownerAuth],
  ["dify", "Workflow automation", "Dify", "trigger configured workflows and query integrated data", ownerAuth],
  ["handoff", "Private file transfer", "Handoff", "move a private temporary file between Manus devices", parentOnly],
  ["slides", "Presentation production", "Slides", "create and edit presentation artifacts", parentOnly],
  ["triggers", "Condition automation", "Manus Triggers", "create, inspect, dry-run, enable, and debug triggers", parentOnly],
  ["trip", "Travel search", "Trip.com", "search flights, hotels, attractions, and travel services", parentOnly],
  ["workflow", "Durable orchestration", "Workflow", "compose deterministic multi-agent workflows", parentOnly],
  ["linear-cycles", "Planning cycles", "Linear", "plan cycles, milestones, and project delivery", ownerAuth],
  ["linear-comments", "Issue collaboration", "Linear", "read and add issue comments and updates", ownerAuth],
  ["hubspot-companies", "Company intelligence", "HubSpot", "retrieve company records and relationship context", ownerAuth],
  ["hubspot-deals", "Deal pipeline", "HubSpot", "inspect and update deal stages and properties", ownerAuth],
  ["intercom-search", "Conversation search", "Intercom", "find support conversations with universal search", ownerAuth],
  ["sentry-analysis", "Incident analysis", "Sentry", "analyze stack traces, performance, and regressions", ownerAuth],
  ["neon-branches", "Database branches", "Neon", "create, inspect, and switch database branches", ownerAuth],
  ["neon-sql", "SQL execution", "Neon", "run documented SQL against an authorized branch", ownerAuth],
  ["airtable-schema", "Table design", "Airtable", "inspect fields, views, and table structure", ownerAuth],
  ["stripe-products", "Catalog billing", "Stripe", "create and list products, prices, and coupons", ownerAuth],
  ["stripe-subscriptions", "Subscriptions", "Stripe", "create, update, cancel, and list subscriptions", ownerAuth],
  ["stripe-invoices", "Invoicing", "Stripe", "create and manage invoices and invoice items", ownerAuth],
  ["stripe-refunds", "Refunds", "Stripe", "retrieve and process refunds", ownerAuth],
  ["paypal-orders", "Order capture", "PayPal", "capture and review authorized orders", ownerAuth],
  ["paypal-invoices", "Invoice workflows", "PayPal", "create, send, and reconcile invoices", ownerAuth],
  ["cloudflare-d1", "Edge database", "Cloudflare D1", "query and manage Worker-bound databases", ownerAuth],
  ["cloudflare-r2", "Object storage", "Cloudflare R2", "manage buckets and stored objects", ownerAuth],
  ["cloudflare-kv", "Key-value storage", "Cloudflare KV", "read and write edge configuration records", ownerAuth],
  ["webflow-cms", "CMS collections", "Webflow CMS", "query and update collection items", ownerAuth],
  ["webflow-publish", "Site publication", "Webflow", "prepare and publish authorized site changes", ownerAuth],
  ["wix-orders", "Commerce orders", "Wix", "query orders and fulfillment context", ownerAuth],
  ["wix-products", "Product catalog", "Wix", "query and manage products", ownerAuth],
  ["xero-invoices", "Accounting invoices", "Xero", "query and manage invoices", ownerAuth],
  ["xero-reports", "Financial reports", "Xero", "retrieve accounting reports", ownerAuth],
  ["todoist-projects", "Task projects", "Todoist", "manage projects and sections", ownerAuth],
  ["todoist-search", "Task search", "Todoist", "find tasks and commitments", ownerAuth],
  ["google-events", "Event creation", "Google Calendar", "create and update authorized events", connected],
  ["outlook-events", "Event creation", "Outlook Calendar", "create and update authorized events", connected],
  ["gmail-drafts", "Draft composition", "Gmail", "prepare drafts without sending", ownerAuth],
  ["outlook-drafts", "Draft composition", "Outlook Mail", "prepare drafts without sending", connected],
  ["hf-models", "Model discovery", "Hugging Face", "search model cards and capabilities", ownerAuth],
  ["hf-datasets", "Dataset discovery", "Hugging Face", "search datasets and metadata", ownerAuth],
  ["heygen-voices", "Avatar voices", "HeyGen", "list and select avatar voices", ownerAuth],
  ["minimax-voice", "Voice synthesis", "MiniMax", "generate multilingual speech and voices", ownerAuth],
  ["minimax-images", "Image generation", "MiniMax", "generate visual assets", ownerAuth],
  ["dify-workflows", "Workflow execution", "Dify", "invoke configured Dify workflows", ownerAuth],
  ["trigger-events", "Event options", "Manus Triggers", "inspect provider events and options", available],
  ["trip-flights", "Flight search", "Trip.com", "search routes and fare calendars", available],
  ["trip-hotels", "Hotel search", "Trip.com", "search stays and deal options", available],
  ["trip-attractions", "Attraction search", "Trip.com", "search tickets and local experiences", available],
  ["workflow-agents", "Agent fan-out", "Workflow", "run structured parallel research units", available],
  ["workflow-reduce", "Result aggregation", "Workflow", "aggregate deterministic subtask results", available],
  ["connector-export", "Connector export", "ScrollVerse local registry", "export the current connector surface as metadata", connected],
  ["shopify-xlviiiblocks", "Storefront admin", "Shopify · XLVIIIblocks", "review storefront products, orders, discounts, and pre-order or rewards readiness through the installed Manus connector", connected, "https://admin.shopify.com/store/juv8tg-1n"],
  ["paypal-payments", "PayPal Checkout", "PayPal for Business", "stage checkout, order capture, refunds, and payment reconciliation after owner authorization or sign-in", ownerAuth],
];

export const connectorToolSurface: ConnectorCapability[] = entries.map(([id, name, connector, canDo, state, adminUrl]) => ({ id, name, connector, connectsTo: connector, canDo, state, ...(adminUrl ? { adminUrl } : {}) }));
export const ENUMERATED_TOOL_SURFACE_COUNT = connectorToolSurface.length;
export const TOOL_SURFACE_COUNT = ENUMERATED_TOOL_SURFACE_COUNT;
/** Owner-observed All-list count; names for these cards have not been supplied to this local workspace. */
export const DISCOVERED_TOOL_SURFACE_COUNT = 424;
export const AWAITING_ENUMERATION_COUNT = DISCOVERED_TOOL_SURFACE_COUNT - ENUMERATED_TOOL_SURFACE_COUNT;
export const TRUTHFUL_STATE = "TRUTHFUL STATE";
export const TOOL_SURFACE_LABEL = "424 OBSERVED CARDS · 80 ENUMERATED LOCALLY";

export const CONNECTOR_DIRECTORY_LABELS = [
  "MANUS TOOLS", "GMAIL", "GOOGLE CALENDAR", "OUTLOOK MAIL", "OUTLOOK CALENDAR", "SESSION REFERENCES", "HUBSPOT", "INTERCOM", "SENTRY", "TODOIST", "MINIMAX", "XERO", "NEON", "LINEAR", "WEBFLOW", "PAYPAL FOR BUSINESS", "ASANA", "WIX", "AIRTABLE", "STRIPE", "CLOUDFLARE", "HUGGING FACE", "HEYGEN", "ZAPIER", "PRISMA POSTGRES", "DIFY", "HANDOFF", "MANUS TASKS", "SLIDES", "TRIGGERS", "TRIP", "WORKFLOW",
] as const;

if (ENUMERATED_TOOL_SURFACE_COUNT !== 80) {
  throw new Error(`Connector surface must contain 80 locally enumerated capability cards; found ${ENUMERATED_TOOL_SURFACE_COUNT}`);
}
