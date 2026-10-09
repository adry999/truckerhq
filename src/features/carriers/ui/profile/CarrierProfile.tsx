import Link from "next/link";
import { Notice } from "@/shared/ui/Notice";
import { STATUS_COLORS } from "@/features/carriers/ui/status-colors";
import { ProfileHeader } from "@/features/carriers/ui/profile/ProfileHeader";
import { ClaimBanner } from "@/features/carriers/ui/profile/ClaimBanner";
import { ScoreBreakdown } from "@/features/carriers/ui/profile/ScoreBreakdown";
import { ProfilePanels } from "@/features/carriers/ui/profile/ProfilePanels";
import { ProfileSidebar } from "@/features/carriers/ui/profile/ProfileSidebar";
import { profileCta, profilePanels, scoreBreakdown } from "@/features/carriers/model/profile";
import type { Carrier } from "@/features/carriers/model/carriers.types";

export function CarrierProfile({ carrier }: { carrier: Carrier }) {
  return (
    <>
      <ProfileHeader carrier={carrier} />
      <ClaimBanner />
      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-[2fr_1fr] md:py-10">
        <div className="flex min-w-0 flex-col gap-5">
          <Notice>
            Sample profile for demonstration. This is not a real carrier and the
            DOT/MC numbers, scores and records are illustrative. Search live
            FMCSA records in{" "}
            <Link href="/tools/carrier-lookup" className="font-semibold underline">
              Carrier Lookup
            </Link>
            .
          </Notice>
          <ScoreBreakdown factors={scoreBreakdown(carrier)} />
          <ProfilePanels panels={profilePanels(carrier, STATUS_COLORS[carrier.status].fg)} />
        </div>
        <ProfileSidebar cta={profileCta(carrier)} />
      </section>
    </>
  );
}
