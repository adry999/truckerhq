import { PHONE_DISPLAY, PHONE_HREF } from "@/shared/config/contact";

export const CONTACT_EMAIL = "hello@truckerhq.com";

export const FACTS = [
  { label: "Founded", value: "20XX" },
  { label: "USDOT", value: "XXXXXXX" },
  { label: "MC", value: "XXXXXXX" },
  { label: "Languages", value: "English · Русский" },
];

export const TEAM = [
  { name: "Name Surname", role: "Founder", note: "EN · RU" },
  {
    name: "Dispatcher Name",
    role: "Dispatcher · Dry van, reefer",
    note: "EN · RU · Nights, Central",
  },
  {
    name: "Dispatcher Name",
    role: "Dispatcher · Flatbed",
    note: "EN · RU · Days, Eastern",
  },
  {
    name: "Name Surname",
    role: "Driver recruiting",
    note: "EN · RU · Days, Central",
  },
];

export const CONTACTS = [
  {
    label: "Dispatch, 24/7",
    value: PHONE_DISPLAY,
    note: "Call or text",
    href: PHONE_HREF,
  },
  {
    label: "Office",
    value: PHONE_DISPLAY,
    note: "Mon–Fri 9–6 CT",
    href: PHONE_HREF,
  },
  {
    label: "Email",
    value: CONTACT_EMAIL,
    note: "Reply same day",
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    label: "Telegram / WhatsApp",
    value: "@truckerhq",
    note: "EN · RU",
    href: "#",
  },
];
