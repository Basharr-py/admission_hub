import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo1.png";
type NavItem =
  | { label: string; kind: "anchor"; href: string }
  | { label: string; kind: "route"; to: string };

const navItems: NavItem[] = [
  { label: "Home", kind: "route", to: "/" },
  { label: "Features", kind: "anchor", href: "#features" },
  { label: "Universities", kind: "anchor", href: "#universities" },
  { label: "About", kind: "route", to: "#about" },
  { label: "Contact", kind: "anchor", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const renderLink = (item: NavItem, onClick?: () => void) =>
    item.kind === "route" ? (
      <Link key={item.label} to={item.to} className={styles.navLink} onClick={onClick}>
        {item.label}
      </Link>
    ) : (
      <a key={item.label} href={item.href} className={styles.navLink} onClick={onClick}>
        {item.label}
      </a>
    );

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img
    src={logo}
    alt="AdmissionHub"
    className={styles.logoImage}
  />
          <span className={styles.logoText}>
  Admission<span className={styles.logoHub}>Hub</span>
</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navItems.map((item) => renderLink(item))}
        </nav>

        <div className={styles.actions}>
          <Link to="/calculator" className={styles.cta}>
            Start Calculating
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`${styles.mobilePanel} ${mobileOpen ? styles.mobilePanelOpen : ""}`}>
        <nav className={styles.mobileNav} aria-label="Mobile">
          {navItems.map((item) => renderLink(item, () => setMobileOpen(false)))}
        </nav>
        <Link to="/calculator" className={styles.ctaMobile} onClick={() => setMobileOpen(false)}>
          Start Calculating
        </Link>
      </div>
    </header>
  );
}
