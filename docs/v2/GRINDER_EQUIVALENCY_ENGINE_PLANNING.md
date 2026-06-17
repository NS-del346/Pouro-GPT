# Grinder Equivalency Engine — Ver.2.0 Planning Handoff

## Purpose

The Grinder Equivalency Engine is a planned Ver.2.0 feature for Pourō-GPT that will enable users to input their specific grinder model and receive brew recipe adjustments calibrated to that grinder's click-based adjustment system.

**Primary question**: Can Pourō reduce brewing friction by translating generic pour-over recipes (e.g., "medium-fine grind") into grinder-specific adjustment steps (e.g., "Baratza Encore: 18 clicks")?

---

## Background: Why Grinder Click Equivalency Matters

### Current State (Ver.1.0)
Pourō-GPT recipes define grind fineness using general descriptors (e.g., "medium," "medium-fine"). Users must manually interpret these descriptors and translate them to their specific grinder's adjustment mechanism, often relying on YouTube videos, online forums, or trial-and-error.

### Problem
- **Friction**: Translation step adds cognitive load and setup time.
- **Uncertainty**: Users may apply incorrect click values, leading to failed or suboptimal brews.
- **Variability**: Different grinders require different "zero points" and click scales.

### Solution Direction
Store grinder calibration data (click ranges, micron equivalents, reference sources) and use it to suggest grinder-specific adjustment steps during Recipe Setup or Brew preparation.

### Scope for Ver.2.0
- **In**: Grinder selection, click value lookup, calibration metadata storage.
- **Out**: Automatic universal grind conversion (remains infeasible); manufacturer endorsement claims.

---

## Expected Data Model

### Grinder Record Structure

Each grinder entry will include:

```typescript
interface GrinderCalibration {
  grinderName: string;           // e.g., "Baratza Encore", "Wilfa Svart"
  burrType: string;               // e.g., "conical", "flat", "burr type name"
  adjustmentSystem: string;        // e.g., "numbered dial 1-40", "click ring 0-28", "stepped adjustment"
  micronPerClick: number | null;   // estimated median particle size change per click (µm)
  rangeMin?: number;               // e.g., 1 (finest)
  rangeMax?: number;               // e.g., 40 (coarsest)
  referenceSource: string;         // e.g., "JapaneseVlogger:YouTube:2023", "CoffeeSnobs:Forum:2024", "UserReport:Mean:N=5"
  confidenceLevel: "verified" | "estimated" | "community" | "placeholder";  // trust signal
  notes?: string;                  // calibration notes, caveats, method used
  lastUpdated?: string;            // ISO 8601 timestamp
}
```

### Storage Location
- **Primary**: `src/data/grinders.ts` (TypeScript data file, similar to `tips.ts`)
- **Reference research**: `docs/research/grinder_calibration_sources.json` (index of sources, metadata, confidence reasoning)

### Example Entry
```typescript
{
  grinderName: "Baratza Encore",
  burrType: "conical",
  adjustmentSystem: "numbered dial 1-40",
  micronPerClick: 15,  // approximate, community-derived
  rangeMin: 1,
  rangeMax: 40,
  referenceSource: "CoffeeSnobs:Forum:2024, UserReport:Mean:N=12",
  confidenceLevel: "community",
  notes: "Values based on average of 12 community reports; actual micron-per-click varies with bean density and burr wear. Verify on sample batch before critical brew."
}
```

---

## Source Confidence Policy

### Unofficial/Community Data Treatment

All grinder calibration data from unofficial sources (forums, YouTube, community reports, user submissions) **must be explicitly treated as approximate**:

1. **Source Labeling**: Every entry must include a `referenceSource` field that identifies where the calibration came from.
2. **Confidence Signal**: Every entry must include a `confidenceLevel` field:
   - `verified`: Manufacturer-provided, peer-reviewed, or independently reproduced (rare).
   - `estimated`: Derived from multiple reliable sources or careful measurement.
   - `community`: Aggregated from forum/user reports.
   - `placeholder`: Temporary; pending better data.
3. **No False Endorsement**: Do not imply that unofficial values are manufacturer-endorsed or guaranteed.
4. **No Averaging Without Context**: If displaying an average click value from multiple reports, include the sample size and variance range.

### Example UI Signal
```
Baratza Encore: ~18 clicks (community, n=12 reports, range 16–20)
```

---

## Approximation and UI Precision Policy

### Principle: No False Precision

The UI **must not** display values in a way that falsely implies exactness or guarantees brew success:

1. **Use "~" (approximately) prefix** in UI when displaying community/estimated values:
   - ✅ "~18 clicks"
   - ✗ "18 clicks" (without confidence context)

2. **Include confidence metadata visually**:
   - Show source type (community, estimated, verified).
   - Show sample size if available.
   - Link to research source.

3. **Add disclaimer in Brew prep screen**:
   - "Grind settings are approximate. Verify on a test batch before your final brew."
   - "Actual grind varies with bean density, freshness, and burr wear."

4. **No precision beyond what data supports**:
   - Do not display "18.4 clicks" from community data.
   - Do not imply micron estimates are measurements rather than extrapolations.

---

## Non-Goals (Out of Scope for Ver.2.0)

Explicitly excluded from this planning phase:

- **Automatic universal grind conversion**: No algorithm will automatically convert between grinder models (e.g., Encore click to Wilfa Svart position). Users must select their specific grinder.
- **Manufacturer endorsement claims**: This feature does not claim grinder makers approve these values.
- **Exact particle distribution prediction**: This feature does not claim to predict particle size distribution or espresso extraction potential.
- **Grind consistency scoring**: No algorithm to grade "how consistent" a grind is across particle sizes.
- **Cross-grinder interpolation**: No math to estimate grind for a grinder not in the database.
- **Real-time scale integration**: No Bluetooth or API integration with grinder scales (future post-V2.0 candidate).

---

## Implementation Cautions

### Data Maintenance Risk
Grinder specifications, burr designs, and user-reported calibrations change. Outdated or incorrect data can mislead users into suboptimal brews or wasted beans.

- **Mitigation**: Include `lastUpdated` timestamp; mark entries older than 2 years for review.
- **Mitigation**: Provide a user feedback mechanism to report inaccurate calibrations (future PR candidate).

### Legal/Liability Risk
Grinder manufacturers may view unofficial calibration data as unsanctioned. Do not imply manufacturer approval.

- **Mitigation**: Include NOTICE.md disclaimer; ensure footer includes source attribution.
- **Mitigation**: No trademark misuse; refer to grinder by model name, not logo.

### UI Complexity Risk
Adding grinder selection and click adjustment to Recipe Setup may increase cognitive load if not carefully designed.

- **Mitigation**: Grinder selection should be optional; default to generic descriptors if grinder not selected.
- **Mitigation**: Click adjustment should appear only if grinder has calibration data.

---

## Future PR Candidates

### Post-Implementation Enhancements
1. **PR-V2-02: Grinder Feedback Loop**
   - User submission form to report calibration accuracy/inaccuracy.
   - Back-end aggregation to update confidence levels and source metadata.

2. **PR-V2-03: Grinder Research Expansion**
   - Reach out to grinder communities, Reddit /r/coffee, forums for crowd-sourced calibration.
   - Formalise confidence scoring based on aggregation method.

3. **PR-V2-04: Scale Integration (Post-V2.0)**
   - Optional Bluetooth scale connection to detect burr wear and recalibrate micron-per-click.
   - Advanced: automatic grind adjustment suggestions during multi-pour brews.

4. **PR-V2-05: Grinder Preset Profiles**
   - Pre-configured profiles for common method + grinder + bean-type combinations.
   - "Baratza Encore + 4:6 Method + Light Roast → 20 clicks" templates.

5. **PR-V2-06: Calibration Tool UI**
   - In-app grinder calibration wizard; users can measure particles at known click values and submit.
   - Contributes to community calibration database.

---

## Status and Next Steps

### What This Document Does
- Defines the purpose and scope of the Grinder Equivalency Engine.
- Specifies expected data model and source policy.
- Establishes UI precision guardrails to avoid false claims.
- Identifies non-goals and implementation cautions.

### What This Document Does NOT Do
- Implement the feature (no code changes in this PR).
- Create the grinder data file (`src/data/grinders.ts`).
- Design the Recipe Setup UI for grinder selection.
- Create the Brew prep screen UI modifications.

### Next Implementation PR Candidates
1. **PR-V2-02**: Create `src/data/grinders.ts` with initial grinder calibration dataset (10–20 common grinders).
2. **PR-V2-03**: Add grinder selection dropdown to Recipe Setup page.
3. **PR-V2-04**: Add grinder-based click adjustment suggestion to Brew prep screen.
4. **PR-V2-05**: Add confidence badge and source attribution to grinder displays.

---

## Document Control

- **Author**: Codex (NS-del346/Pouro-GPT Workflow)
- **Created**: 2026-06-17
- **Status**: Planning Handoff (Ver.2.0 Concept Phase)
- **Version**: 1.0
- **Next Review**: Before PR-V2-02 implementation begins
