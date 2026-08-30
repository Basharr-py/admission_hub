import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { getUniversities } from "../../api/university";
import type { University } from "../../types/university";
import styles from "./UniversitiesSection.module.css";

const TOP_UNIVERSITIES = [
  "UNILAG",
  "UI",
  "OAU",
  "UNILORIN",
  "ABU",
  "UNIBEN",
  "UNN",
  "UNIPORT",
  "FUTA",
  "FUTO",
];

export default function UniversitiesSection() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUniversities() {
      try {
        const data = await getUniversities();

const topUniversities = TOP_UNIVERSITIES
  .map((abbr) =>
    data.find((u) => u.short_name.toUpperCase() === abbr)
  )
  .filter(Boolean) as University[];

setUniversities(topUniversities);
      } catch (error) {
        // Homepage teaser fails quietly — the full Directory page is where
        // errors get surfaced properly. No point blocking the rest of the
        // homepage over this section alone.
        setUniversities([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadUniversities();
  }, []);

  return (
    <section id="universities" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Supported Universities</span>
          <h2 className={styles.title}>
            Cut-offs and requirements for the schools you're actually applying to
          </h2>
        </div>

        {isLoading ? (
          <div className={styles.stateMessage}>
            <Loader2 size={18} className={styles.spinner} strokeWidth={2} />
            Loading universities...
          </div>
        ) : (
          <div className={styles.grid}>
            {universities.map((u) => (
              <Link key={u.id} to={`/universities/${u.id}`} className={styles.card}>
                {u.logo_url ? (
                  <img src={u.logo_url} alt={`${u.name} logo`} className={styles.logo} />
                ) : (
                  <span className={styles.abbr}>{u.short_name}</span>
                )}
                <span className={styles.name}>{u.name}</span>
              </Link>
            ))}
          </div>
        )}

        <div className={styles.footerRow}>
          <Link to="/universities" className={styles.viewAllBtn}>
            View All Universities
            <ArrowRight size={16} strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}