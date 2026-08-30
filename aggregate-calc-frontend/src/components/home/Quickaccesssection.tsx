import { Link } from "react-router-dom";
import { Calculator, BookOpen, Target, Building2, ArrowRight } from "lucide-react";
import styles from "./Quickaccesssection.module.css";

const tools = [
  {
    icon: Calculator,
    title: "Aggregate Calculator",
    description: "Combine your UTME score and O'Level results into an accurate aggregate.",
    to: "/calculator",
    color: "#2563eb",
    soft: "#eff6ff",
  },
  {
    icon: BookOpen,
    title: "Course Requirements",
    description: "Check subject combinations and entry requirements for any course.",
    to: "/requirements",
    color: "#10b981",
    soft: "#ecfdf5",
  },
  {
    icon: Target,
    title: "Required Screening Score",
    description: "See the minimum score you need to clear Post-UTME screening.",
    to: "/screening-score",
    color: "#f59e0b",
    soft: "#fffbeb",
  },
  {
    icon: Building2,
    title: "University Directory",
    description: "Browse cut-off marks and admission details for Nigerian universities.",
    to: "/universities",
    color: "#8b5cf6",
    soft: "#f5f3ff",
  },
];

export default function QuickAccessSection() {
  return (
    <section id="quick-access" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Quick Access</span>
          <h2 className={styles.title}>The tools you need, one tap away</h2>
        </div>

        <div className={styles.grid}>
          {tools.map((tool) => (
            <Link key={tool.title} to={tool.to} className={styles.card}>
              <div
                className={styles.iconWrap}
                style={{ background: tool.soft }}
              >
                <tool.icon size={20} color={tool.color} strokeWidth={2} />
              </div>
              <h3 className={styles.cardTitle}>{tool.title}</h3>
              <p className={styles.cardDescription}>{tool.description}</p>
              <span className={styles.cardLink} style={{ color: tool.color }}>
                Open tool
                <ArrowRight size={15} strokeWidth={2.4} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}