import { useEffect } from "react";
import { useLocation } from "wouter";

const API_BASE = "/api";
const SESSION_KEY = "bw_session_id";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function VisitorTracker() {
  const [location] = useLocation();

  useEffect(() => {
    const sessionId = getSessionId();

    fetch(`${API_BASE}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        page: location,
        referrer: document.referrer || null,
      }),
    }).catch(() => {});
  }, [location]);

  return null;
}
