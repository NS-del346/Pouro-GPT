import { Page } from "../components/layout/Page";
import { visiblePlaceholderMethods } from "../data";

export function SourcesPage() {
  return (
    <Page
      title="Sources"
      description="How Pourō treats source status, review status, and placeholder brew data."
      backTo="/settings"
    >
      <section className="content-card">
        <h2>Review policy</h2>
        <p>
          Recipe values, pour amounts, timings, grind notes, and temperature
          notes are kept as placeholder or needs-review data until the source
          review is complete.
        </p>
        <p>
          Pourō may organize information from public materials, books, maker
          materials, competition references, and creator-published content, but
          the app presents the result as an independently organized guide.
        </p>
      </section>

      <section className="content-card">
        <h2>Status labels</h2>
        <dl className="detail-list">
          <div>
            <dt>verified</dt>
            <dd>Reviewed source data, with placeholder recipe values removed.</dd>
          </div>
          <div>
            <dt>thirdParty</dt>
            <dd>Reference information from a third-party source.</dd>
          </div>
          <div>
            <dt>needsReview</dt>
            <dd>Information exists but still needs source review.</dd>
          </div>
          <div>
            <dt>placeholder</dt>
            <dd>Temporary UI and flow data, not a confirmed recipe.</dd>
          </div>
        </dl>
      </section>

      <section className="content-card">
        <h2>Current method data</h2>
        <dl className="detail-list">
          {visiblePlaceholderMethods.map((method) => (
            <div key={method.id}>
              <dt>{method.displayName}</dt>
              <dd>
                sourceStatus: {method.sourceStatus} / verificationLevel:{" "}
                {method.verificationLevel}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Page>
  );
}
