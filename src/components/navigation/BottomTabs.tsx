import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Brew", to: "/" },
  { label: "History", to: "/history" },
  { label: "Settings", to: "/settings" },
];

export function BottomTabs() {
  return (
    <nav className="bottom-tabs" aria-label="メインナビゲーション">
      {tabs.map((tab) => (
        <NavLink
          className={({ isActive }) =>
            `bottom-tab${isActive ? " bottom-tab--active" : ""}`
          }
          end={tab.to === "/"}
          key={tab.to}
          to={tab.to}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}

