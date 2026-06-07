/**
 * Massive.com File Storage Management Page
 * Upload, list, and manage files in the ScrollVerse sovereign storage vault.
 */
import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, FolderOpen, Trash2, Download, Database, Cloud, File } from "lucide-react";

export default function MassiveStorage() {
  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prefix, setPrefix] = useState("");
  const [uploading, setUploading] = useState(false);

  const listQuery = trpc.massive.listFiles.useQuery(
    { prefix },
    { enabled: !!user, retry: false }
  );

  const uploadMutation = trpc.massive.uploadFile.useMutation({
    onSuccess: (data) => {
      toast.success(`File uploaded — stored at: ${data.key}`);
      listQuery.refetch();
    },
    onError: (err) => toast.error(`Upload failed: ${err.message}`),
  });

  const deleteMutation = trpc.massive.deleteFile.useMutation({
    onSuccess: () => {
      toast.success("File deleted");
      listQuery.refetch();
    },
    onError: (err) => toast.error(`Delete failed: ${err.message}`),
  });

  const getUrlMutation = trpc.massive.getFileUrl.useMutation({
    onSuccess: (data) => window.open(data.url, "_blank"),
    onError: (err) => toast.error(`Could not get URL: ${err.message}`),
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const buffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer))));
      await uploadMutation.mutateAsync({
        key: `scrollverse/${Date.now()}-${file.name}`,
        data: base64,
        contentType: file.type || "application/octet-stream",
        fileName: file.name,
      });
    } catch {
      // handled by onError
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const files = listQuery.data?.files ?? [];

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.15)", background: "rgba(0,212,255,0.03)" }}>
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)" }}>
              <Cloud className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Massive.com Storage Vault</h1>
              <p className="text-sm" style={{ color: "#8899AA" }}>Sovereign file storage · Bucket: flatfiles · S3-compatible</p>
            </div>
            <Badge className="ml-auto" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
              MASSIVE CONNECTED
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-6">
        {!user && (
          <div className="rounded-xl p-8 text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
            <p className="text-white font-bold mb-2">Sign in required</p>
            <p className="text-sm" style={{ color: "#8899AA" }}>Please sign in to access the sovereign storage vault.</p>
          </div>
        )}

        {user && (
          <>
            {/* Upload + Filter Row */}
            <div className="flex flex-wrap gap-3 items-center">
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A", fontWeight: 700 }}
              >
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload File"}
              </Button>
              <div className="flex gap-2 flex-1 max-w-xs">
                <Input
                  placeholder="Filter by prefix..."
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                />
                <Button
                  size="sm"
                  onClick={() => listQuery.refetch()}
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}
                >
                  <FolderOpen className="w-4 h-4" />
                </Button>
              </div>
              <div className="ml-auto text-sm" style={{ color: "#8899AA" }}>
                {files.length} file{files.length !== 1 ? "s" : ""} · Bucket: <span style={{ color: "#FFB800" }}>flatfiles</span>
              </div>
            </div>

            {/* File List */}
            {listQuery.isLoading && (
              <div className="text-center py-12" style={{ color: "#8899AA" }}>Loading files...</div>
            )}

            {listQuery.isError && (
              <div className="rounded-xl p-4" style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.2)" }}>
                <p className="text-sm" style={{ color: "#FF4444" }}>
                  Could not connect to Massive.com. Verify your MASSIVE_API_KEY in Settings → Secrets.
                </p>
              </div>
            )}

            {!listQuery.isLoading && files.length === 0 && !listQuery.isError && (
              <div className="rounded-xl p-12 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(0,212,255,0.2)" }}>
                <Database className="w-12 h-12 mx-auto mb-4" style={{ color: "#8899AA" }} />
                <p className="text-white font-bold mb-1">Vault is empty</p>
                <p className="text-sm" style={{ color: "#8899AA" }}>Upload your first file to the sovereign storage vault.</p>
              </div>
            )}

            {files.length > 0 && (
              <Card style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5" style={{ color: "#FFB800" }} />
                    Vault Contents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div
                        key={file.key}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.08)" }}
                      >
                        <File className="w-4 h-4 flex-shrink-0" style={{ color: "#FFB800" }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">{file.key}</div>
                          <div className="text-xs" style={{ color: "#8899AA" }}>
                            {formatSize(file.size)} · {new Date(file.lastModified).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => getUrlMutation.mutate({ key: file.key })}
                            disabled={getUrlMutation.isPending}
                            style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF", background: "transparent" }}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteMutation.mutate({ key: file.key })}
                            disabled={deleteMutation.isPending}
                            style={{ borderColor: "rgba(255,68,68,0.3)", color: "#FF4444", background: "transparent" }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Storage Info */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Endpoint", value: "files.massive.com", color: "#00D4FF" },
                { label: "Bucket", value: "flatfiles", color: "#FFB800" },
                { label: "Protocol", value: "S3-Compatible", color: "#00FF88" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${item.color}20` }}>
                  <div className="text-xs mb-1" style={{ color: "#8899AA" }}>{item.label}</div>
                  <div className="font-mono font-bold" style={{ color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
