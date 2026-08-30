import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import styles from "./AboutPage.module.css";

const principles = [
  {
    title: "Accuracy over false hope",
    description: "We show where you actually stand, even when the answer is \"not yet.\"",
  },
  {
    title: "Nigeria-first",
    description:
      "Built around JAMB, UTME, and Post-UTME rules as they actually apply — not adapted from somewhere else.",
  },
  {
    title: "Always current",
    description:
      "Cut-offs and requirements are session-specific, because last year's numbers can mislead you.",
  },
  {
    title: "Free to check where you stand",
    description:
      "The core calculator stays accessible — figuring out your odds shouldn't cost you anything.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>About AdmissionHub</span>
          <h1 className={styles.heroTitle}>Admission decisions shouldn't hinge on rumors.</h1>
          <p className={styles.heroLead}>
            Every UTME season, thousands of candidates try to figure out their odds from
            screenshots, forwarded messages, and forum guesswork. We built AdmissionHub to
            replace that with a straight answer.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Why we built this</h2>
            <p className={styles.blockText}>
              Getting into a Nigerian university runs on more than a UTME score — O'Level
              weighting, subject combinations, and Post-UTME screening all factor in, and each
              university applies them differently. Most candidates never see the actual formula,
              only the outcome.
            </p>
            <p className={styles.blockText}>
              AdmissionHub exists to close that gap: put in your real numbers, and see a real
              comparison against real cut-offs — not a guess.
            </p>
          </div>

          <div className={styles.divider} />

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>What we believe</h2>
            <p className={styles.blockText}>
              An aggregate calculator is only useful if it's honest. We'd rather show you that
              you're below a cut-off today than tell you what you want to hear.
            </p>
          </div>

          <div className={styles.principles}>
            {principles.map((p) => (
              <div key={p.title} className={styles.principle}>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleText}>{p.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>A product of Aridunnu Consult Academy</h2>
            <p className={styles.blockText}>
              AdmissionHub is built and maintained by Aridunnu Consult Academy, with admission
              guidance at the center of what we do.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}