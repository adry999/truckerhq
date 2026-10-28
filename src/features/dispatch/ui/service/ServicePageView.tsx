import { DISPATCH_COPY } from "@/features/dispatch/data/dispatch-copy";
import type { ServicePage } from "@/features/dispatch/data/service-pages";
import { DispatchCta } from "@/features/dispatch/ui/landing/DispatchCta";
import { DispatchIncluded } from "@/features/dispatch/ui/landing/DispatchIncluded";
import { DispatchPricing } from "@/features/dispatch/ui/landing/DispatchPricing";
import { ServiceBreadcrumb } from "./ServiceBreadcrumb";
import { ServiceFaq } from "./ServiceFaq";
import { ServiceHero } from "./ServiceHero";
import { ServiceLinks } from "./ServiceLinks";
import { ServiceSections } from "./ServiceSections";
import { ServiceToolLink } from "./ServiceToolLink";

export function ServicePageView({ page }: { page: ServicePage }) {
  const c = DISPATCH_COPY.EN;
  return (
    <>
      <ServiceBreadcrumb name={page.name} />
      <ServiceHero page={page} />
      <ServiceSections sections={page.sections} />
      {page.slug === "new-authority" && <ServiceToolLink />}
      <DispatchIncluded c={c} />
      <DispatchPricing c={c} />
      <ServiceFaq faq={page.faq} name={page.name} />
      <ServiceLinks currentSlug={page.slug} />
      <DispatchCta c={c} />
    </>
  );
}
