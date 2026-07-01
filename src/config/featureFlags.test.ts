import { describe, expect, it } from "vitest";
import { ACTIVE_BREW_REFERENCE_ENABLED } from "./featureFlags";

describe("ACTIVE_BREW_REFERENCE_ENABLED", () => {
  it("remains disabled until a later Human Gate authorizes rollout", () => {
    expect(ACTIVE_BREW_REFERENCE_ENABLED).toBe(false);
  });
});
