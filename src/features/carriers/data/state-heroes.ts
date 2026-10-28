import type { StaticImageData } from "next/image";
import stateHeroA from "@/assets/images/home-hero.jpg";
import stateHeroB from "@/assets/images/state-hero-b.jpg";
import stateHeroC from "@/assets/images/state-hero-c.jpg";

// The 50 state JSON files share three Unsplash photos; keyed by photo id from the URL.
const LOCAL_HEROES: Record<string, StaticImageData> = {
  "photo-1720811559395-3ed8d1b16649": stateHeroA,
  "photo-1631914730551-1cfbcdf6f603": stateHeroB,
  "photo-1779583074717-e60fa13131ce": stateHeroC,
};

export function stateHeroSource(url: string): StaticImageData | string {
  const id = /photo-[\w-]+/.exec(url)?.[0];
  return (id && LOCAL_HEROES[id]) || url;
}
