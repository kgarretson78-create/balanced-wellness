/** Future first-party adapter contract. No network transport or storage. */
export type WebsiteEvent = {
  schemaVersion: 1;
  event: "booking_click" | "phone_click" | "sms_click";
  location: "kingsport" | "jonesborough";
};
// Check consent for every event. Never queue or replay pre-consent events.
export function websiteEvent(input: unknown, consent: unknown): WebsiteEvent | null {
  if (consent !== "granted" || !input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  if (Object.keys(value).some(key => !["event", "location"].includes(key))) return null;
  if (typeof value.event !== "string" || !["booking_click", "phone_click", "sms_click"].includes(value.event)) return null;
  if (value.location !== "kingsport" && value.location !== "jonesborough") return null;
  return { schemaVersion: 1, event: value.event as WebsiteEvent["event"], location: value.location };
}
