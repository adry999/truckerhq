"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeaderNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`flex h-11 items-center rounded-lg px-3 text-[15px] font-medium hover:bg-white/8 hover:text-amber ${
        active ? "bg-amber/10 text-amber" : "text-offwhite"
      }`}
    >
      {label}
    </Link>
  );
}
