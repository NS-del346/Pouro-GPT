import { Outlet, useLocation } from "react-router-dom";
import { BottomTabs } from "../navigation/BottomTabs";

export function AppShell() {
  const { pathname } = useLocation();
  const hideBottomTabs = pathname === "/timer" || pathname === "/finish";

  return (
    <div className="app-shell">
      <main
        className={`app-content${hideBottomTabs ? " app-content--full" : ""}`}
      >
        <Outlet />
      </main>
      {!hideBottomTabs && <BottomTabs />}
    </div>
  );
}

