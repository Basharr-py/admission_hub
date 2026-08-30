import { Building2, BookOpen, ClipboardEdit, BarChart3 } from "lucide-react";
import styles from "./HowItWorksSection.module.css";

const steps = [
  {
    icon: Building2,
    title: "Select University",
    description: "Choose the Nigerian university you're aiming for.",
  },
  {
    icon: BookOpen,
    title: "Choose Course",
    description: "Pick the course and see its required subject combination.",
  },
  {
    icon: ClipboardEdit,
    title: "Enter Examination Scores",
    description: "Add your UTME score and O'Level results.",
  },
  {
    icon: BarChart3,
    title: "Get Admission Analysis",
    description: "See your aggregate measured against the real cut-off.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>How It Works</span>
          <h2 className={styles.title}>From score to answer in four steps</h2>
        </div>

        <ol className={styles.timeline}>
          {steps.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <div className={styles.stepMarker}>
                <div className={styles.stepIconWrap}>
                  <step.icon size={18} color="#ffffff" strokeWidth={2.2} />
                </div>
                {i < steps.length - 1 && <div className={styles.connector} aria-hidden="true" />}
              </div>
              <div className={styles.stepContent}>
                <span className={styles.stepNum}>Step {i + 1}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}