import { AboutContact } from "@/features/contact/ui/AboutContact";
import { AboutHero } from "@/features/contact/ui/AboutHero";
import { AboutTeam } from "@/features/contact/ui/AboutTeam";

export function About() {
  return (
    <>
      <AboutHero />
      <AboutTeam />
      <AboutContact />
    </>
  );
}
