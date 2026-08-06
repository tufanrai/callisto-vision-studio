"use client";

import { useId, useRef, useState } from "react";

export interface TabDef {
  id: string;
  label: string;
  /** Optional count shown alongside the label. */
  meta?: string;
}

/**
 * WAI-ARIA tab pattern with roving tabindex and arrow-key navigation.
 *
 * Every panel is rendered server-side and only toggled with the `hidden`
 * attribute, so all 80 published prices are present in the initial HTML —
 * hiding them behind client-side state would keep them out of the crawl.
 */
export function Tabs({
  tabs,
  panels,
  label,
  tone = "light",
}: {
  tabs: readonly TabDef[];
  panels: readonly React.ReactNode[];
  label: string;
  tone?: "light" | "dark";
}) {
  const base = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(active + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab(active - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  };

  const activeCls =
    tone === "light"
      ? "bg-ink text-snow border-ink"
      : "bg-snow text-ink border-snow";
  const idleCls =
    tone === "light"
      ? "border-edge-light text-ink-muted hover:border-ink hover:text-ink"
      : "border-edge-dark text-mist hover:border-snow hover:text-snow";

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-wrap lg:px-0"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${tab.id}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${tab.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`label inline-flex min-h-12 shrink-0 items-center gap-2  border px-5 transition-colors ${
              i === active ? activeCls : idleCls
            }`}
          >
            {tab.label}
            {tab.meta ? (
              <span
                className={i === active ? "opacity-60" : "opacity-70"}
                aria-hidden="true"
              >
                {tab.meta}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${base}-panel-${tab.id}`}
          aria-labelledby={`${base}-tab-${tab.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="mt-8 focus-visible:outline-2"
        >
          {panels[i]}
        </div>
      ))}
    </div>
  );
}
