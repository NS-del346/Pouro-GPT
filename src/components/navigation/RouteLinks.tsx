import { Link } from "react-router-dom";

interface RouteLink {
  label: string;
  to: string;
}

interface RouteLinksProps {
  links: RouteLink[];
}

export function RouteLinks({ links }: RouteLinksProps) {
  return (
    <div className="route-links">
      {links.map((link) => (
        <Link className="route-link" key={link.to} to={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

