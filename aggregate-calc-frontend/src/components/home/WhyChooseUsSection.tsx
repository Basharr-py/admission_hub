import { X, Check } from "lucide-react";
import styles from "./WhyChooseSection.module.css";

const rows = [
  {
    label: "Where information comes from",
    without: "Forum posts and forwarded WhatsApp screenshots",
    withUs: "One verified source, kept current each session",
  },
  {
    label: "Calculating your aggregate",
    without: "Manual math, easy to get wrong",
    withUs: "Calculated the way universities actually screen",
  },
  {
    label: "Cut-off marks",
    without: "Old numbers from a previous admission year",
    withUs: "Session-specific, updated cut-offs",
  },
  {
    label: "Knowing your chances",
    without: "Guesswork and rumors",
    withUs: "A clear comparison against real requirements",
  },
  {
    label: "Coverage",
    without: "Generic advice not built for Nigerian admissions",
    withUs: "Built around JAMB, UTME, and Post-UTME rules",
  },
];

export default function WhyChooseSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Why Choose AdmissionHub</span>
          <h2 className={styles.title}>The difference between guessing and knowing</h2>
        </div>

        <div className={styles.compareGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>Without AdmissionHub</span>
            </div>
            <ul className={styles.rowList}>
              {rows.map((r) => (
                <li key={r.label} className={styles.row}>
                  <X size={16} className={styles.iconNo} strokeWidth={2.4} />
                  <div>
                    <span className={styles.rowLabel}>{r.label}</span>
                    <p className={styles.rowText}>{r.without}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.panel} ${styles.panelHighlight}`}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabelHighlight}>With AdmissionHub</span>
              <span className={styles.badge}>Recommended</span>
            </div>
            <ul className={styles.rowList}>
              {rows.map((r) => (
                <li key={r.label} className={styles.row}>
                  <Check size={16} className={styles.iconYes} strokeWidth={2.4} />
                  <div>
                    <span className={styles.rowLabel}>{r.label}</span>
                    <p className={styles.rowText}>{r.withUs}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}