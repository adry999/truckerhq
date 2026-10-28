import { PHONE_DISPLAY, PHONE_HREF } from "@/shared/config/contact";
import { SITE_HOST } from "@/shared/config/site";
import Link from "next/link";
import { CookieSettingsButton } from "@/shared/ui/CookieSettingsButton";
import { FOOTER_COPY, type FooterLink } from "@/shared/i18n/footer-copy";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import Logo from "./Logo";

export default function SiteFooter({ lang = "EN" }: { lang?: Locale }) {
  const c = getCopy(FOOTER_COPY, lang);
  // The contact column leads with the phone and email, which are not translated.
  const [services, tools, contact] = c.columns;
  const contactLinks: FooterLink[] = [
    { t: `${PHONE_DISPLAY} · 24/7`, href: PHONE_HREF },
    { t: `hello@${SITE_HOST}`, href: `mailto:hello@${SITE_HOST}` },
    ...contact.links,
  ];
  const columns = [services, tools, { ...contact, links: contactLinks }];
  return (
    <footer className="bg-asphalt font-sans text-[#C9CBCF]">
      <div className="road-line h-1.5" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-8 pt-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <Logo theme="dark" size={32} />
            <p className="text-sm leading-relaxed">
              {c.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.h} className="flex flex-col gap-1">
              <div className="mb-1.5 font-display text-[15px] font-bold tracking-[.14em] text-amber">
                {col.h}
              </div>
              {col.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex min-h-11 items-center text-[15px] text-[#E4E6E9] hover:text-amber"
                >
                  {l.t}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/12 pt-6 text-[13px] text-[#8A8F98]">
          <span>{c.legalLine}</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1.5">
            {c.legal.map((l) => (
              <Link key={l.t} href={l.href} className="text-[#AEB2B8] hover:text-amber">
                {l.t}
              </Link>
            ))}
            <CookieSettingsButton className="text-[#AEB2B8] hover:text-amber" label={c.cookieSettings} />
            <span>
              <Link href="/" className="text-[#AEB2B8] hover:text-amber">
                English
              </Link>
              {" · "}
              <Link href="/ru" className="text-[#AEB2B8] hover:text-amber">
                Русский
              </Link>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
