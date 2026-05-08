import { useState } from "react";
import { Download, Lock, RefreshCw, Mail, Phone, MessageCircle } from "lucide-react";

interface Lead {
  id: number;
  firstName: string | null;
  email: string | null;
  phone: string | null;
  smsConsent: boolean;
  primaryGoal: string | null;
  treatmentInterest: string | null;
  conversationSummary: string | null;
  status: string | null;
  source: string | null;
  createdAt: string;
}

interface Subscriber {
  id: number;
  email: string;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  emailConsent: boolean;
  smsConsent: boolean;
  source: string | null;
  createdAt: string;
}

export default function AdminLeads() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("bw_admin_key") || "");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"kelli" | "popup">("kelli");

  const apiBase = (import.meta as any).env?.VITE_API_URL || "/api";

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [leadsResp, subsResp] = await Promise.all([
        fetch(`${apiBase}/kelliai/leads`, { headers: { "x-admin-key": adminKey } }),
        fetch(`${apiBase}/subscribers`, { headers: { "x-admin-key": adminKey } }),
      ]);
      if (!leadsResp.ok || !subsResp.ok) {
        setError("Invalid admin key. Try again.");
        setLoading(false);
        return;
      }
      const leadsData = await leadsResp.json();
      const subsData = await subsResp.json();
      setLeads(leadsData.leads || []);
      setSubscribers(subsData.subscribers || []);
      setAuthed(true);
      localStorage.setItem("bw_admin_key", adminKey);
    } catch {
      setError("Could not connect. Please try again.");
    }
    setLoading(false);
  };

  const downloadCSV = (kind: "kelli" | "popup") => {
    const url = kind === "kelli"
      ? `${apiBase}/kelliai/leads.csv?key=${encodeURIComponent(adminKey)}`
      : `${apiBase}/subscribers.csv?key=${encodeURIComponent(adminKey)}`;
    window.open(url, "_blank");
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/40 to-white px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Admin Leads</h1>
              <p className="text-sm text-foreground/60">Balanced Wellness CRM</p>
            </div>
          </div>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Enter admin key"
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary mb-3"
            onKeyDown={(e) => e.key === "Enter" && loadData()}
          />
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <button
            onClick={loadData}
            disabled={!adminKey || loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </div>
    );
  }

  const list = tab === "kelli" ? leads : subscribers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Leads & Subscribers</h1>
            <p className="text-sm text-foreground/60">Capture, view, and export</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadData} className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium hover:bg-secondary/40 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={() => downloadCSV(tab)} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2">
              <Download className="w-4 h-4" /> Download CSV
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-4 border-b border-border">
          <button
            onClick={() => setTab("kelli")}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === "kelli" ? "border-primary text-primary" : "border-transparent text-foreground/60"}`}
          >
            <MessageCircle className="w-4 h-4 inline mr-1.5" />
            KelliAI Leads ({leads.length})
          </button>
          <button
            onClick={() => setTab("popup")}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === "popup" ? "border-primary text-primary" : "border-transparent text-foreground/60"}`}
          >
            <Mail className="w-4 h-4 inline mr-1.5" />
            Popup Subscribers ({subscribers.length})
          </button>
        </div>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {list.length === 0 ? (
            <div className="p-12 text-center text-foreground/50">
              No {tab === "kelli" ? "KelliAI leads" : "subscribers"} yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-foreground/70 text-xs uppercase">
                  <tr>
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Phone</th>
                    <th className="text-left px-4 py-3">SMS</th>
                    {tab === "kelli" && <th className="text-left px-4 py-3">Notes</th>}
                    <th className="text-left px-4 py-3">When</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((row: any) => (
                    <tr key={row.id} className="border-t border-border hover:bg-secondary/20">
                      <td className="px-4 py-3 font-medium">{row.firstName || row.lastName || "—"}</td>
                      <td className="px-4 py-3"><a href={`mailto:${row.email}`} className="text-primary hover:underline">{row.email || "—"}</a></td>
                      <td className="px-4 py-3"><a href={`tel:${row.phone}`} className="text-primary hover:underline">{row.phone || "—"}</a></td>
                      <td className="px-4 py-3">{row.smsConsent ? "✓" : "—"}</td>
                      {tab === "kelli" && (
                        <td className="px-4 py-3 max-w-sm">
                          <details className="cursor-pointer">
                            <summary className="text-xs text-foreground/60">View conversation</summary>
                            <pre className="text-xs mt-2 whitespace-pre-wrap text-foreground/70">{row.conversationSummary || "(no summary)"}</pre>
                          </details>
                        </td>
                      )}
                      <td className="px-4 py-3 text-xs text-foreground/50">{new Date(row.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
