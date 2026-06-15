# Pourō-GPT Ver2.0 Stitch Reference Policy

## 1. Purpose

This document records how the final Stitch output for Pourō-GPT Ver2.0 may be used by future design and implementation PRs.

The Stitch output is a visual reference. It is not production source.

## 2. Reference artifact

Google Drive file:

```text
stitch_pour_gpt_precision_brew_cockpit.zip
https://drive.google.com/file/d/194TsAvsSsA7oQsqM25qnnQAnXpJP0Lv6/view
```

Observed Drive metadata during planning:

- title: `stitch_pour_gpt_precision_brew_cockpit.zip`
- file id: `194TsAvsSsA7oQsqM25qnnQAnXpJP0Lv6`
- created: 2026-06-15
- modified: 2026-06-15

## 3. Allowed use

Future PRs may use the Stitch reference for:

- screen hierarchy
- screen list
- layout direction
- visual tone
- component inspiration
- timer information hierarchy
- 4:6 9-combination presentation direction
- click converter screen intent
- navigation model
- Japanese-first UI direction
- motion reference

## 4. Prohibited use

Future PRs must not:

- commit the Stitch ZIP to the repo
- commit generated screenshots as production assets
- copy generated `code.html` into the app
- copy generated CSS or JavaScript directly
- treat generated HTML as React architecture
- add generated assets under `public/` or `src/assets/` unless a later explicit asset PR approves them
- implement all screens in one PR
- treat Stitch wording as source-verified recipe truth

## 5. Implementation translation rule

Use this translation model:

```text
Stitch screen.png / contact sheet / DESIGN.md
↓
Human-reviewed Markdown specification
↓
Small Codex implementation PRs
↓
Independent verifier + regression check
```

Do not use:

```text
Stitch generated code
↓
Direct copy into production app
```

## 6. Motion and animation

Stitch animation may be used only as a motion reference.

Allowed future implementation techniques:

- CSS transition
- CSS keyframes
- React state-driven step transitions
- countdown ring or progress bar
- click converter tick visual feedback
- optional sound triggered by user interaction

Rules:

- Timer truth must come from React/application state, not CSS animation alone.
- Pause, resume, previous, next, and completion must remain deterministic.
- Reduced-motion support must be available.
- Sound must be optional and user-controlled.

## 7. Known visual decisions from final Stitch pass

Final accepted planning direction:

- light visual system overall
- softened borders, less aggressive outlines
- amber accent used selectively
- bottom navigation: `抽出 / ツール / 履歴 / 設定`
- timer may use a darker `Active Brew Focus Surface`
- Brew Result must be photo-free
- History and History Detail are brew-log-first, not bean-inventory-first
- Click Converter is an approximate tool, not a precision calibration device
- 4:6 is shown as a 9-combination system

## 8. Required corrections during implementation

Even when following Stitch, later implementation must correct or preserve:

- Japanese-first labels
- approved method scope only: `4:6 / Hybrid / 10 Pour / Ice`
- no `V60 STANDARD` as a main method name
- 10 Pour fixed / non-scalable constraints
- `1:45 / 210g` preserved for 10 Pour
- no photos in Brew Result
- no icon-only destructive actions
- no AI diagnosis language
- no exact grinder particle-size claim
- no claim of official approval, supervision, certification, partnership, endorsement, or guaranteed result

## 9. Status

This reference is planning material only. It does not itself approve production implementation.
