import { ShieldCheck, ScrollText, Zap, Smartphone, Sparkles, Bot } from "lucide-react";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: ShieldCheck,
    title: "Accurate Aggregate Calculation",
    description: "Built on the exact weighting universities use — not a generic average.",
  },
  {
    icon: ScrollText,
    title: "Official Admission Rules",
    description: "Requirements and cut-offs sourced from official university guidelines.",
  },
  {
    icon: Zap,
    title: "Fast Results",
    description: "Get your aggregate and course comparisons in seconds, not spreadsheets.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Built for the phone in your hand, not just a desktop browser.",
  },
  {
    icon: Sparkles,
    title: "Modern Interface",
    description: "Clean, uncluttered design that gets out of the way of your decision.",
  },
  {
    icon: Bot,
    title: "Future AI Recommendations",
    description: "Personalized course and university suggestions, on the way.",
    upcoming: true,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Platform Features</span>
          <h2 className={styles.title}>What makes AdmissionHub different</h2>
        </div>

        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.iconWrap}>
                <f.icon size={19} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                {f.upcoming && <span className={styles.badge}>Soon</span>}
              </div>
              <p className={styles.cardDescription}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}