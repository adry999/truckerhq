import Link from "next/link";

export function ServiceToolLink() {
  return (
    <aside className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <p className="rounded-lg border-[1.5px] border-border bg-white p-5 text-lg leading-relaxed text-[#3F444B]">
        Starting a new MC? Go through the{" "}
        <Link href="/tools/new-mc-checklist" className="font-semibold underline underline-offset-2">
          New MC Checklist
        </Link>{" "}
        step by step.
      </p>
    </aside>
  );
}
