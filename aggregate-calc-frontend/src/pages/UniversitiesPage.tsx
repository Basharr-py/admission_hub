import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { getUniversities } from "../api/university";
import type { University } from "../types/university";
import styles from "./UniversitiesPage.module.css";

const PAGE_SIZE = 12;

export default function UniversitiesPage() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadUniversities() {
      try {
        setIsLoading(true);
        const data = await getUniversities();
        // NOTE: the API response currently only sends { id, name, short_name,
        // state, screening_type } — is_active isn't included, so it can't be
        // filtered here. If inactive universities exist in the DB, they WILL
        // show up in this list until either:
        //   (a) the repository query adds .filter(University.is_active == True), or
        //   (b) the response schema includes is_active and this page filters on it
        // (a) is the cleaner fix — filtering at the DB level instead of shipping
        // dead rows to the client at all.
        setUniversities(data);
      } catch (error) {
        setErrorMessage("Unable to load universities. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadUniversities();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return universities;
    return universities.filter(
      (u) => u.name.toLowerCase().includes(q) || u.short_name.toLowerCase().includes(q)
    );
  }, [universities, search]);

  // Reset to page 1 whenever the search changes, so you never land on a
  // page that no longer exists for the new result set.
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  function goToPage(page: number) {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>University Directory</span>
          <h1 className={styles.title}>Every supported university, in one place</h1>
          <p className={styles.subhead}>
            Search to find admission details for the school you're applying to.
          </p>
        </div>
      </section>

      <section className={styles.controlsSection}>
        <div className={styles.inner}>
          <div className={styles.controls}>
            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} strokeWidth={2} />
              <input
                type="text"
                placeholder="Search by university name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {!isLoading && !errorMessage && (
            <p className={styles.resultCount}>
              {filtered.length} {filtered.length === 1 ? "university" : "universities"}
            </p>
          )}
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.inner}>
          {isLoading && (
            <div className={styles.stateMessage}>
              <Loader2 size={20} className={styles.spinner} strokeWidth={2} />
              Loading universities...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className={styles.stateMessage}>{errorMessage}</div>
          )}

          {!isLoading && !errorMessage && filtered.length === 0 && (
            <div className={styles.stateMessage}>
              No universities match your search. Try a different name.
            </div>
          )}

          {!isLoading && !errorMessage && paginated.length > 0 && (
            <>
              <div className={styles.grid}>
                {paginated.map((u) => (
                  <div
                    key={u.id}
                    className={styles.card}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/universities/${u.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        navigate(`/universities/${u.id}`);
                      }
                    }}
                  >
                    <div className={styles.cardTop}>
                      {u.logo_url ? (
                        <img src={u.logo_url} alt={`${u.name} logo`} className={styles.logo} />
                      ) : (
                        <div className={styles.logoFallback}>{u.short_name.slice(0, 3)}</div>
                      )}
                      {u.ownership && (
                        <span className={styles.ownershipBadge}>{u.ownership}</span>
                      )}
                    </div>

                    <h3 className={styles.cardName}>{u.name}</h3>
                    <p className={styles.cardState}>{u.state} State</p>

                    {u.screening_type === "POST_UTME" && (
                      <span className={styles.screeningTag}>Post-UTME Required</span>
                    )}

                    <div className={styles.cardFooter}>
                      {u.website && (
                        <a
                          href={u.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.websiteLink}
                          // Stops the card's own onClick from also firing and
                          // navigating to the detail page when this link is used.
                          onClick={(e) => e.stopPropagation()}
                        >
                          Official site
                          <ExternalLink size={13} strokeWidth={2.2} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.pagination}>
                <button
                  type="button"
                  className={styles.pageBtn}
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} strokeWidth={2.4} />
                  Previous
                </button>

                <span className={styles.pageIndicator}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  className={styles.pageBtn}
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={16} strokeWidth={2.4} />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}