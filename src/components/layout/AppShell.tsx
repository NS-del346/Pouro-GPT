import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BottomTabs } from "../navigation/BottomTabs";

export function AppShell() {
  const { pathname } = useLocation();
  const hideBottomTabs = pathname === "/timer" || pathname === "/finish";
  const themeClassName =
    pathname === "/timer" ? "theme-active-brew" : "theme-precision";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className={`app-shell ${themeClassName}`}>
      <main
        className={`app-content${hideBottomTabs ? " app-content--full" : ""}`}
      >
        <Outlet />
      </main>
      {!hideBottomTabs && <BottomTabs />}
    </div>
  );
}

