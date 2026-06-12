# PR-011F: 4:6 R-01 Runtime Data QA

## 1. Purpose

This PR implements the narrow source-backed 4:6 Basic / R-01 runtime
candidate approved by PR-011E.

## 2. Scope

* 4:6 R-01 only.
* Source-backed basic candidate only.
* `fieldEvidence` applied to every changed runtime field.
* R-02 through R-06 remain unchanged and placeholder-safe.
* No Hybrid, 10 Pour, or Ice Brew changes.

## 3. Files changed

* `src/types/brew.ts`
* `src/data/placeholderMethods.ts`
* `src/data/index.ts`
* `src/pages/BrewTimerPage.tsx`
* `docs/qa/PR-011F-four-six-r01-runtime-data.md`

## 4. Runtime data decision

### Implemented

R-01 now has an optional variant-scoped recipe override for the approved basic
source example:

* Coffee: `20g`
* Water: `300g`
* Ratio: `1:15`
* Five equal `60g` pours
* Pour starts: `00:00`, `00:45`, `01:30`, `02:15`, and `02:45`
* `03:30` is represented as a dripper-removal action, not guaranteed natural
  drawdown completion
* `totalTimeSec: 210` represents that removal action

The R-01 recipe and steps contain field-level evidence using only S1 HARIO
Coffee Scale POLARIS and S2 Philocoffea from PR-011C. Source-example values
and timings use `source_original`; Pourō identifiers, mappings, labels, and
caution treatment use `app_guidance`; temperature and grind remain
`unresolved`.

The method-level and R-01 variant-level placeholder caution flags remain
unchanged. The new source-backed steps remain `needsReview` / `unverified` at
container level and are not generic placeholder steps.

`getRecipeForSetup` selects the R-01 runtime candidate only for the exact
`R-01`, `20g`, `300g`, `1:15` setup. R-02 through R-06 and non-exact R-01
setups continue to use the existing method-wide placeholder recipe. No
app-calculated scaling is introduced by this PR.

## 5. Verification

| Check                                                   | Result |
| ------------------------------------------------------- | ------ |
| npm.cmd run build                                       | Pass   |
| git diff --check                                        | Pass   |
| No dist files                                           | Pass   |
| Only 4:6 R-01 runtime data changed                      | Pass   |
| R-02 through R-06 unchanged                             | Pass   |
| Hybrid unchanged                                        | Pass   |
| 10 Pour unchanged                                       | Pass   |
| Ice Brew unchanged                                      | Pass   |
| Every changed runtime field has fieldEvidence           | Pass   |
| Source-original and app-calculated values distinguished | Pass   |
| No source status weakened                               | Pass   |
| No verification level weakened                          | Pass   |
| No timer state-machine rewrite                          | Pass   |
| No route changes                                        | Pass   |
| No storage schema changes                               | Pass   |
| No PWA / manifest / workflow changes                    | Pass   |

Source-original values are limited to the exact reviewed example. No
app-calculated runtime values are introduced; non-exact R-01 setups fall back
to the placeholder recipe.

## 6. Manual mobile QA

Tested at:

* `375x667`
* `390x844`

Results:

* Selecting 4:6 R-01 with `20g` and `1:15` opens the intended five-pour basic
  candidate.
* Brew Timer shows the source-backed schedule only for exact R-01.
* R-02 and non-exact R-01 setups remain placeholder-safe.
* Hybrid, 10 Pour, and Ice Brew remain on their existing placeholder
  schedules.
* No `undefined`, `null`, `NaN`, or misleading `--g` is displayed.
* Pause / Resume works.
* Next step works.
* Back works.
* Finish works.
* BottomTabs remain hidden on Brew Timer.
* No horizontal overflow.
* No browser console warnings or errors.

## 7. Result

Result: Pass.

Blocking issues: None.

Non-blocking follow-ups:

* R-02 through R-06 source review
* Hybrid evidence pack
* 10 Pour evidence pack
* Ice Brew evidence pack
