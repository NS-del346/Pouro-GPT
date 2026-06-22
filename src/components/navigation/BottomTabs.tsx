import { NavLink, useLocation } from "react-router-dom";
import navBrewIcon from "../../assets/navigation/nav-brew.png";
import navHistoryIcon from "../../assets/navigation/nav-history.png";
import navSettingsIcon from "../../assets/navigation/nav-settings.png";
import navToolsIcon from "../../assets/navigation/nav-tools.png";

const tabs = [
  { icon: navBrewIcon, label: "抽出", to: "/" },
  { icon: navToolsIcon, label: "ツール", to: "/tools" },
  { icon: navHistoryIcon, label: "履歴", to: "/history" },
  { icon: navSettingsIcon, label: "設定", to: "/settings" },
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
          <span className="bottom-tab__icon-frame" aria-hidden="true">
            <img
              alt=""
              aria-hidden="true"
              className="bottom-tab__icon"
              src={tab.icon}
            />
          </span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
