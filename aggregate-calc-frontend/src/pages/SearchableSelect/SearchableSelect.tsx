import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import styles from "./SearchableSelect.module.css";

export interface SearchableSelectOption {
  value: number;
  label: string;
  sublabel?: string;
}

interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  emptyMessage?: string;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  disabled = false,
  emptyMessage = "No results found",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        (o.sublabel && o.sublabel.toLowerCase().includes(q))
    );
  }, [options, query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(optionValue: number) {
    onChange(optionValue);
    setOpen(false);
    setQuery("");
  }

  return (
    <div className={styles.wrap} ref={containerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${disabled ? styles.triggerDisabled : ""} ${
          open ? styles.triggerOpen : ""
        }`}
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
      >
        <span className={selected ? styles.triggerValue : styles.triggerPlaceholder}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={16} className={styles.chevron} strokeWidth={2} />
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.searchRow}>
            <Search size={14} className={styles.searchIcon} strokeWidth={2} />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.optionsList}>
            {filtered.length === 0 && <div className={styles.emptyMessage}>{emptyMessage}</div>}
            {filtered.map((option) => (
              <button
                type="button"
                key={option.value}
                className={styles.option}
                onClick={() => handleSelect(option.value)}
              >
                <span className={styles.optionText}>
                  <span className={styles.optionLabel}>{option.label}</span>
                  {option.sublabel && (
                    <span className={styles.optionSublabel}>{option.sublabel}</span>
                  )}
                </span>
                {option.value === value && (
                  <Check size={15} className={styles.checkIcon} strokeWidth={2.4} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}