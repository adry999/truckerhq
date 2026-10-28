import "server-only";
import { serverEnv } from "@/server/env";
import { sendEmail } from "@/server/messaging/email";

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** `driver_count` -> `Driver count` */
const humanize = (key: string) => {
  const words = key.replace(/_/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Emails the team a table of the saved lead row; never throws, and no-ops without LEADS_NOTIFY_TO. */
export async function sendLeadAlert(label: string, row: Record<string, unknown>): Promise<void> {
  const recipients = (serverEnv().LEADS_NOTIFY_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (recipients.length === 0) {
    console.log(`[lead-alert] skipped (LEADS_NOTIFY_TO not set): label="${label}"`);
    return;
  }

  const who = [asText(row.name), asText(row.company)].filter(Boolean).join(", ");
  const subject = who ? `New lead: ${label} (${who})` : `New lead: ${label}`;
  const rows = Object.entries(row)
    .map(
      ([key, value]) =>
        `<tr><th align="left">${escapeHtml(humanize(key))}</th><td>${escapeHtml(String(value ?? ""))}</td></tr>`,
    )
    .join("");
  const html = `<table border="1" cellpadding="6" cellspacing="0">${rows}</table>`;

  const email = asText(row.email);
  try {
    await sendEmail(recipients, subject, html, email ? { replyTo: email } : {});
  } catch {
    console.error(`[lead-alert] failed: label="${label}"`);
  }
}
