import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageProps {
  title: string;
  eyebrow?: string;
  description: string;
  backTo?: string;
  children?: ReactNode;
}

export function Page({
  title,
  eyebrow = "PR-001 foundation",
  description,
  backTo,
  children,
}: PageProps) {
  return (
    <section className="page">
      {backTo && (
        <Link className="back-link" to={backTo}>
          戻る
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

