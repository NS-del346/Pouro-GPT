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

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<BrewHomePage />} />
        <Route path="setup/:methodId" element={<RecipeSetupPage />} />
        <Route path="timer" element={<BrewTimerPage />} />
        <Route path="finish" element={<BrewFinishPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="history/:sessionId" element={<HistoryDetailPage />} />
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

