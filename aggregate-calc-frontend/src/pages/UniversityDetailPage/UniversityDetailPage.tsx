import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search, ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import { getUniversities, getCourses } from "../../api/university";
import type { University } from "../../types/university";
import type { Course } from "../../types/course";
import styles from "./UniversityDetailPage.module.css";

const PAGE_SIZE = 12;

export default function UniversityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const universityId = Number(id);

  const [university, setUniversity] = useState<University | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [universityList, courseList] = await Promise.all([
          getUniversities(),
          getCourses(universityId),
        ]);

        const match = universityList.find((u) => u.id === universityId) ?? null;
        setUniversity(match);
        setCourses(courseList);
      } catch (error) {
        setErrorMessage("Unable to load this university's details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (!Number.isNaN(universityId)) {
      loadData();
    } else {
      setErrorMessage("Invalid university.");
      setIsLoading(false);
    }
  }, [universityId]);

  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => c.name.toLowerCase().includes(q));
  }, [courses, search]);

  // Reset to page 1 whenever search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, currentPage]);

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
          <Link to="/universities" className={styles.backLink}>
            <ArrowLeft size={15} strokeWidth={2.4} />
            Back to Directory
          </Link>

          {isLoading && (
            <div className={styles.stateMessage}>
              <Loader2 size={20} className={styles.spinner} strokeWidth={2} />
              Loading university details...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className={styles.stateMessage}>{errorMessage}</div>
          )}

          {!isLoading && !errorMessage && !university && (
            <div className={styles.stateMessage}>University not found.</div>
          )}

          {!isLoading && !errorMessage && university && (
            <div className={styles.universityHeader}>
              {university.logo_url ? (
                <img
                  src={university.logo_url}
                  alt={`${university.name} logo`}
                  className={styles.logo}
                />
              ) : (
                <div className={styles.logoFallback}>{university.short_name.slice(0, 3)}</div>
              )}

              <div>
                <span className={styles.eyebrow}>University Profile</span>
                <h1 className={styles.title}>{university.name}</h1>
                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>{university.state} State</span>
                  {university.ownership && (
                    <span className={styles.metaItem}>{university.ownership}</span>
                  )}
                  {university.screening_type === "POST_UTME" && (
                    <span className={styles.screeningTag}>Post-UTME Required</span>
                  )}
                  {university.website && (
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.websiteLink}
                    >
                      Official site
                      <ExternalLink size={13} strokeWidth={2.2} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {!isLoading && !errorMessage && university && (
        <section className={styles.coursesSection}>
          <div className={styles.inner}>
            <div className={styles.coursesHeader}>
              <h2 className={styles.coursesTitle}>Courses Offered</h2>
              <div className={styles.searchWrap}>
                <Search size={15} className={styles.searchIcon} strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            {filteredCourses.length === 0 ? (
              <div className={styles.stateMessage}>
                {courses.length === 0
                  ? "No courses listed for this university yet."
                  : "No courses match your search."}
              </div>
            ) : (
              <>
                <div className={styles.grid}>
                  {paginated.map((course) => (
                    <div key={course.id} className={styles.courseCard}>
                      <h3 className={styles.courseName}>{course.name}</h3>
                      <div className={styles.scoreRow}>
                        <div className={styles.scoreItem}>
                          <span className={styles.scoreLabel}>Min. JAMB</span>
                          <span className={styles.scoreValue}>{course.min_jscore}</span>
                        </div>
                        <div className={styles.scoreItem}>
                          <span className={styles.scoreLabel}>Cut-off</span>
                          <span className={styles.scoreValue}>{course.current_cutoff}</span>
                        </div>
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
      )}

      <Footer />
    </>
  );
}