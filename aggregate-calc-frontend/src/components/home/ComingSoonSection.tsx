import { TrendingUp, Bot, Award, LayoutDashboard, Newspaper, LineChart } from "lucide-react";
import styles from "./ComingSoonSection.module.css";

const upcoming = [
  {
    icon: TrendingUp,
    title: "Admission Chance Predictor",
    description: "A realistic read on your odds for any course, before you apply.",
  },
  {
    icon: Bot,
    title: "AI Admission Assistant",
    description: "Ask questions about requirements and get instant, accurate answers.",
  },
  {
    icon: Award,
    title: "Scholarship Finder",
    description: "Match your profile against scholarships you actually qualify for.",
  },
  {
    icon: LayoutDashboard,
    title: "Personal Dashboard",
    description: "Track your calculations, saved courses, and progress in one place.",
  },
  {
    icon: Newspaper,
    title: "Admission News",
    description: "Deadlines and policy changes, surfaced before they catch you off guard.",
  },
  {
    icon: LineChart,
    title: "Premium Analytics",
    description: "Deeper insight into trends across courses and universities over time.",
  },
];

export default function ComingSoonSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Coming Soon</span>
          <h2 className={styles.title}>We're not stopping at the calculator</h2>
        </div>

        <div className={styles.grid}>
          {upcoming.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  <f.icon size={19} color="var(--color-primary)" strokeWidth={2} />
                </div>
                <span className={styles.badge}>Coming Soon</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDescription}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}