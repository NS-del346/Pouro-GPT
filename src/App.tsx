import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { AboutPage } from "./pages/AboutPage";
import { BrewFinishPage } from "./pages/BrewFinishPage";
import { BrewHomePage } from "./pages/BrewHomePage";
import { BrewTimerPage } from "./pages/BrewTimerPage";
import { HistoryDetailPage } from "./pages/HistoryDetailPage";
import { HistoryPage } from "./pages/HistoryPage";
import { LegalPage } from "./pages/LegalPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { RecipeSetupPage } from "./pages/RecipeSetupPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SourcesPage } from "./pages/SourcesPage";
import type { BrewSession, BrewSetup } from "./types";

export function App() {
  const [activeSetup, setActiveSetup] = useState<BrewSetup | null>(null);
  const [finishedSessionDraft, setFinishedSessionDraft] =
    useState<BrewSession | null>(null);
  const [replaySetupDraft, setReplaySetupDraft] = useState<BrewSetup | null>(null);

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          index
          element={
            <BrewHomePage
              onReplayBrew={(setup) => setReplaySetupDraft(setup)}
            />
          }
        />
        <Route
          path="setup/:methodId"
          element={
            <RecipeSetupPage
              onStartBrew={(setup) => {
                setActiveSetup(setup);
                setFinishedSessionDraft(null);
              }}
              replaySetupDraft={replaySetupDraft}
              onReplaySetupConsumed={() => setReplaySetupDraft(null)}
            />
          }
        />
        <Route
          path="timer"
          element={
            <BrewTimerPage
              activeSetup={activeSetup}
              onFinishBrew={setFinishedSessionDraft}
            />
          }
        />
        <Route
          path="finish"
          element={
            <BrewFinishPage
              finishedSessionDraft={finishedSessionDraft}
              onClearFinishedSession={() => setFinishedSessionDraft(null)}
            />
          }
        />
        <Route path="history" element={<HistoryPage />} />
        <Route
          path="history/:sessionId"
          element={
            <HistoryDetailPage
              onReplayBrew={(setup) => setReplaySetupDraft(setup)}
            />
          }
        />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="settings/about" element={<AboutPage />} />
        <Route path="settings/sources" element={<SourcesPage />} />
        <Route path="settings/legal" element={<LegalPage />} />
        <Route path="settings/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
