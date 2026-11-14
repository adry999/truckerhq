import { PHONE_DISPLAY, PHONE_HREF } from "@/shared/config/contact";
import { SITE_HOST } from "@/shared/config/site";
import Link from "next/link";
import { CookieSettingsButton } from "@/shared/ui/CookieSettingsButton";
import { FOOTER_COPY, type FooterGroup } from "@/shared/i18n/footer-copy";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import Logo from "./Logo";

function FooterColumn({ group }: { group: FooterGroup }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-1.5 font-display text-[15px] font-bold tracking-[.14em] text-amber">{group.h}</div>
      {group.links.map((l) => (
        <Link key={l.href} href={l.href} className="flex min-h-11 items-center text-[15px] text-on-dark hover:text-amber">
          {l.t}
        </Link>
      ))}
    </div>
  );
}

export default function SiteFooter({ lang = "EN" }: { lang?: Locale }) {
  const c = getCopy(FOOTER_COPY, lang);
  const contact: FooterGroup = {
    h: c.contactHeading,
    links: [
      { t: `${PHONE_DISPLAY} · 24/7`, href: PHONE_HREF },
      { t: `hello@${SITE_HOST}`, href: `mailto:hello@${SITE_HOST}` },
    ],
  };
  return (
    <footer className="bg-asphalt font-sans text-on-dark-soft">
      <div className="road-line h-1.5" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-8 pt-14 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-8">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <Logo theme="dark" size={32} />
            <p className="text-sm leading-relaxed">{c.tagline}</p>
          </div>
          {c.columns.map((col) => (
            <FooterColumn key={col.h} group={col} />
          ))}
          <div className="col-span-2 grid grid-cols-2 gap-x-6 sm:col-span-1 sm:grid-cols-1 sm:gap-y-6">
            <FooterColumn group={contact} />
            <FooterColumn group={c.company} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/12 pt-6 text-[13px] text-faint">
          <span>{c.legalLine}</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1.5">
            {c.legal.map((l) => (
              <Link key={l.t} href={l.href} className="text-on-dark-muted hover:text-amber">
                {l.t}
              </Link>
            ))}
            <CookieSettingsButton className="text-on-dark-muted hover:text-amber" label={c.cookieSettings} />
            <span>
              <Link href="/" className="text-on-dark-muted hover:text-amber">
                English
              </Link>
              {" · "}
              <Link href="/ru" className="text-on-dark-muted hover:text-amber">
                Русский
              </Link>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
