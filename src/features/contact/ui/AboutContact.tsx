import { CONTACTS } from "@/features/contact/data/about";
import AboutContactForm from "@/features/contact/ui/AboutContactForm";

export function AboutContact() {
  return (
    <section id="contact" className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2.5">
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              Contact
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-[#3F444B]">
              Call, text or message us. Dispatch is answered 24/7.
            </p>
          </div>
          <div className="overflow-hidden rounded-[10px] border-[1.5px] border-border">
            {CONTACTS.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-offwhite ${
                  i ? "border-t border-border" : ""
                }`}
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm text-grey">{c.label}</span>
                  <span className="text-lg font-bold">{c.value}</span>
                </span>
                <span className="text-sm text-grey">{c.note}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-base font-semibold">
                Street address
              </span>
              <span className="text-base text-[#3F444B]">
                City, ST 00000
              </span>
              <span className="text-sm text-grey">
                Office Mon–Fri 9–6 CT. Dispatch line open 24/7.
              </span>
            </div>
            <div className="aspect-video rounded-lg bg-border" />
          </div>
        </div>
        <AboutContactForm />
      </div>
    </section>
  );
}
