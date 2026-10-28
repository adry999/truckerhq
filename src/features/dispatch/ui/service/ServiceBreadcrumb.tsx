import Link from "next/link";

export function ServiceBreadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-white">
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 text-sm text-[#4B5058] sm:px-6">
        <li>
          <Link href="/dispatch" className="underline-offset-2 hover:underline">
            Dispatch
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-semibold text-asphalt">
          {name}
        </li>
      </ol>
    </nav>
  );
}
