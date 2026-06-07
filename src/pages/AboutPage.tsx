import { Page } from "../components/layout/Page";

export function AboutPage() {
  return (
    <Page
      title="About Pourō"
      description="A quiet brew guide and timer for hand-drip coffee."
      backTo="/settings"
    >
      <section className="content-card">
        <h2>Pour slowly. Brew deeply.</h2>
        <p>
          Pourō helps organize the small decisions in a hand-drip brew:
          sequence, timing, water amount, and reflection after the cup.
        </p>
        <p>
          The MVP is intentionally local and lightweight. It does not include
          login, cloud sync, ads, analytics, social features, or external API
          integrations.
        </p>
      </section>

      <section className="content-card">
        <h2>Independent guide</h2>
        <p>
          Pourō is an independent brew guide and timer. It is not connected to
          or produced by any individual, organization, roaster, competition, or
          equipment maker referenced in the app.
        </p>
      </section>
    </Page>
  );
}
