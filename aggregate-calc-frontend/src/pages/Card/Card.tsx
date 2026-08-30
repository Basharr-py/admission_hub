import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

/**
 * Every calculator card renders through this wrapper instead of styling
 * its own border/shadow/padding independently — this is what keeps the
 * three cards visually identical instead of drifting out of sync.
 */
export default function Card({ title, description, children }: CardProps) {
  return (
    <div className={styles.card}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
}