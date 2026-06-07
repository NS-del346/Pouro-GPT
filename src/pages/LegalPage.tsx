import { Page } from "../components/layout/Page";

export function LegalPage() {
  return (
    <Page
      title="Legal Notices"
      description="Important notices about independence, trademarks, brew results, and reviewed source status."
      backTo="/settings"
    >
      <section className="content-card">
        <h2>Independent product</h2>
        <p>
          Pourō is an independent app for organizing hand-drip coffee brewing
          steps, timing, water amounts, and brew notes.
        </p>
        <p>
          Pourō is not connected to or produced by any individual, group,
          maker, roaster, or competition referenced in the app.
        </p>
      </section>

      <section className="content-card">
        <h2>Names and trademarks</h2>
        <p>
          Method names, person names, maker names, equipment names, and other
          names are used only to identify references, compatibility, or source
          context. Each name belongs to its respective rights holder.
        </p>
      </section>

      <section className="content-card">
        <h2>No brew guarantee</h2>
        <p>
          Brew results can change with beans, roast degree, grind size, water
          quality, water temperature, equipment, pouring speed, and environment.
          Pourō does not guarantee any specific taste or brewing result.
        </p>
      </section>
    </Page>
  );
}
