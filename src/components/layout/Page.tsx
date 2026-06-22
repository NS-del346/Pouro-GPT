import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import actionBackIcon from "../../assets/actions/action-back.png";

interface PageProps {
  title: string;
  eyebrow?: string;
  description: string;
  backTo?: string;
  className?: string;
  children?: ReactNode;
}

export function Page({
  title,
  eyebrow = "pourō",
  description,
  backTo,
  className,
  children,
}: PageProps) {
  return (
    <section className={`page${className ? ` ${className}` : ""}`}>
      {backTo && (
        <Link className="back-link" to={backTo}>
          <span className="back-link__icon-frame" aria-hidden="true">
            <img
              alt=""
              aria-hidden="true"
              className="back-link__icon"
              src={actionBackIcon}
            />
          </span>
          <span className="back-link__label">戻る</span>
        </Link>
      )}
      <header className="page-header">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}
