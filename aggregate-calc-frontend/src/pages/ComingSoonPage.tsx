import { Link } from "react-router-dom";
import { Construction, ArrowRight } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import styles from "./ComingSoonPage.module.css";

interface ComingSoonPageProps {
  title: string;
  description: string;
}

/**
 * Temporary placeholder for routes referenced on the homepage
 * (Quick Access cards, footer links) that don't have real pages yet.
 * Swap each usage in App.tsx for a real page as it's built —
 * this component is meant to be deleted once it has no callers left.
 */
export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <>
      <Navbar />
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.iconWrap}>
            <Construction size={22} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <span className={styles.eyebrow}>Coming Soon</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <Link to="/calculator" className={styles.cta}>
            Try the Aggregate Calculator instead
            <ArrowRight size={16} strokeWidth={2.4} />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}