import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Aggregate Calculator", to: "/calculator" },
  { label: "University Directory", to: "/universities" },
  { label: "About", to: "/about" },
];

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMark} aria-hidden="true" />
              <span className={styles.logoText}>AdmissionHub</span>
            </Link>
            <p className={styles.tagline}>A product of Aridunnu Consult Academy</p>
            <p className={styles.description}>
              Everything you need to plan a Nigerian university admission with confidence.
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colHeading}>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colHeading}>Contact</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:hello@admissionhub.ng" className={styles.link}>
                  <FaGithub size={14} strokeWidth={2} />
                  hello@admissionhub.ng
                </a>
              </li>
            </ul>

            <h4 className={`${styles.colHeading} ${styles.socialHeading}`}>Follow</h4>
            <div className={styles.socials}>
              <a href="#" aria-label="Twitter" className={styles.socialBtn}>
                <FaTwitter size={15} />
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialBtn}>
                <FaInstagram size={15} />
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialBtn}>
                <FaLinkedin size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 Aridunnu Consult Academy. All rights reserved.
            <br className={styles.mobileBreak} /> AdmissionHub™ is a product of Aridunnu Consult
            Academy.
          </p>
        </div>
      </div>
    </footer>
  );
}