import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import styles from "./HeroSection.module.css";

const stats = [
  { value: "300+", label: "Universities Supported" },
  { value: "1,200+", label: "Courses Available" },
  { value: "<2s", label: "Instant Calculations" },
];

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            Everything You Need for
            <span className={styles.headlineAccent}> Nigerian University Admission</span>
          </h1>
          <p className={styles.subhead}>
            Calculate your aggregate score, check admission requirements, explore universities,
            and prepare confidently for admission — all in one place.
          </p>

          <div className={styles.buttonRow}>
            <Link to="/calculator" className={styles.primaryBtn}>
              Start Calculating
              <ArrowRight size={17} strokeWidth={2.4} />
            </Link>
            <a href="#quick-access" className={styles.secondaryBtn}>
              Explore Requirements
            </a>
          </div>

          <div className={styles.statRow}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mockupWrap}>
          {/* Floating browser-style mockup of the calculator interface */}
          <div className={styles.browser}>
            <div className={styles.browserBar}>
              <div className={styles.browserDots}>
                <span /><span /><span />
              </div>
              <div className={styles.browserAddress}>admissionhub.ng/calculator</div>
            </div>

            <div className={styles.browserBody}>
              <div className={styles.mockField}>
                <span className={styles.mockLabel}>UTME Score</span>
                <div className={styles.mockInput}>287</div>
              </div>
              <div className={styles.mockField}>
                <span className={styles.mockLabel}>O'Level Grades</span>
                <div className={styles.mockInput}>7 Credits</div>
              </div>
              <div className={styles.mockButton}>Calculate Aggregate</div>

              <div className={styles.mockResult}>
                <span className={styles.mockResultLabel}>Your Aggregate</span>
                <span className={styles.mockResultValue}>76.4</span>
              </div>
            </div>
          </div>

          {/* Decorative floating badges — hidden on small screens to avoid clutter/overflow */}
          <div className={`${styles.floatBadge} ${styles.floatBadgeTop}`}>
            <CheckCircle2 size={15} color="#10b981" />
            Cut-off matched
          </div>
          <div className={`${styles.floatBadge} ${styles.floatBadgeBottom}`}>
            <span className={styles.floatBadgeStrong}>98%</span>
            Accuracy
          </div>
        </div>
      </div>
    </section>
  );
}