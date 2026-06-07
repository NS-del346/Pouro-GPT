import { Page } from "../components/layout/Page";

export function PrivacyPage() {
  return (
    <Page
      title="Privacy Policy"
      description="Pourō stores MVP data locally on your device and does not send brew notes to an external service."
      backTo="/settings"
    >
      <section className="content-card">
        <h2>Local storage</h2>
        <p>
          Pourō stores brew history and app settings in this browser's
          localStorage. This includes brew setup values, brew result notes, and
          the settings saved from the Settings screen.
        </p>
      </section>

      <section className="content-card">
        <h2>No account or tracking</h2>
        <p>
          The MVP does not use login, accounts, ads, analytics, cloud sync, or
          external APIs. Brew notes and settings are not sent to a server by
          Pourō.
        </p>
      </section>

      <section className="content-card">
        <h2>Deleting data</h2>
        <p>
          You can delete saved data from Settings. Browser or device data
          deletion can also remove saved Pourō history and settings.
        </p>
      </section>
    </Page>
  );
}
