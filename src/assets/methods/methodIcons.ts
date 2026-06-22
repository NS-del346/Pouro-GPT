import type { BrewMethodId } from "../../types";
import methodFourSix from "./method-four-six.png";
import methodHybrid from "./method-hybrid.png";
import methodIceBrew from "./method-ice-brew.png";
import methodTenPour from "./method-ten-pour.png";

const methodIconById: Readonly<Record<BrewMethodId, string>> = {
  "four-six": methodFourSix,
  hybrid: methodHybrid,
  "ten-pour": methodTenPour,
  "ice-brew": methodIceBrew,
};

export function getMethodIconSrc(methodId: BrewMethodId): string {
  return methodIconById[methodId];
}
