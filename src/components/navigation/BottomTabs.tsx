import { NavLink, useLocation } from "react-router-dom";

const tabs = [
  { icon: "brew", label: "Brew", to: "/" },
  { icon: "history", label: "History", to: "/history" },
  { icon: "settings", label: "Settings", to: "/settings" },
];

export function BottomTabs() {
  const { pathname } = useLocation();

  function isTabActive(to: string) {
    if (to === "/") {
      return pathname === "/" || pathname.startsWith("/setup/");
    }

    return pathname === to || pathname.startsWith(`${to}/`);
  }

  return (
    <nav className="bottom-tabs" aria-label="メインナビゲーション">
      {tabs.map((tab) => (
        <NavLink
          className={`bottom-tab${isTabActive(tab.to) ? " bottom-tab--active" : ""}`}
          end={tab.to === "/"}
          key={tab.to}
          to={tab.to}
        >
          <span
            aria-hidden="true"
            className={`bottom-tab__icon bottom-tab__icon--${tab.icon}`}
          />
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
