"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Dot } from "@/components/ui/Eyebrow";
import { nav, site } from "@/lib/site";

/**
 * Fixed header.
 *
 * Two behaviours ride the same scroll position:
 *
 *  - past 40px it drops from transparent onto a frosted Snow plate, and the
 *    wordmark, nav and controls invert from Snow to Twilight;
 *  - past 560px it retracts on downward scroll and returns on upward, so the
 *    long pricing and index pages get their full height back.
 *
 * Both are written straight to the element from one passive, rAF-coalesced
 * scroll listener rather than through React state. The plate crosses its
 * threshold on a single frame of a fast flick, and a setState there would
 * queue a render per frame for a change that is purely presentational.
 */
export function Header() {
  const pathname = usePathname();
  /**
   * The panel's open state is stored as the route it was opened on, so a
   * navigation closes it by derivation rather than by a setState-in-effect
   * that would cascade an extra render.
   */
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const barRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let lastY = window.scrollY;
    let solid: boolean | null = null;
    let hidden: boolean | null = null;
    let frame = 0;

    const setHidden = (next: boolean) => {
      if (next === hidden) return;
      hidden = next;
      bar.dataset.hidden = next ? "true" : "false";
      /**
       * Published to the root as well, because the header is not the only
       * thing pinned to the top of the page — the services sub-nav sticks
       * directly beneath it. Without this it stays at the header's height
       * while the header slides away, leaving an 86px hole with the page
       * scrolling through it.
       */
      document.documentElement.dataset.header = next ? "hidden" : "shown";
    };

    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      const nextSolid = y > 40;

      if (nextSolid !== solid) {
        solid = nextSolid;
        bar.dataset.solid = nextSolid ? "true" : "false";
      }

      // The panel is a fixed overlay; retracting the bar under it would
      // strand the close button off-screen.
      if (!open) {
        if (y > 560 && y > lastY + 4) setHidden(true);
        else if (y < lastY - 4 || y < 560) setHidden(false);
      }
      lastY = y;
    };

    apply();
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      // Leaving the page with the root still marked hidden would strand any
      // sticky element on the next route at the wrong offset.
      delete document.documentElement.dataset.header;
    };
  }, [open]);

  const close = useCallback(() => {
    setOpenAt(null);
    triggerRef.current?.focus();
  }, []);

  // Lock scroll, trap focus and wire Escape while the mobile panel is open.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={barRef}
        data-solid="false"
        data-hidden="false"
        className="group/bar bg-transparent transition-[transform,background-color,box-shadow,backdrop-filter] duration-[550ms] ease-brand data-[hidden=true]:-translate-y-[104%] data-[solid=true]:frosted data-[solid=true]:shadow-[inset_0_-1px_0_var(--color-rule-light)]"
      >
        <div className="shell flex h-(--header-height) items-center justify-between gap-[clamp(1rem,3vw,3rem)]">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="shrink-0 py-1.5"
          >
            {/*
              The design swaps two logo rasters here. The wordmark is a traced
              vector that takes `currentColor`, so the same swap is a colour
              transition on one element — no second request, and no flash of
              the outgoing raster while the incoming one decodes.
            */}
            <Wordmark className="h-[clamp(1.5625rem,2.2vw,1.9375rem)] w-auto text-snow transition-colors duration-400 group-data-[solid=true]/bar:text-twilight" />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-[clamp(1.125rem,2.4vw,2.5rem)] min-[900px]:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="link-sweep relative inline-flex items-center gap-[7px] py-1.5 text-[13px] font-medium tracking-[0.04em] whitespace-nowrap text-snow transition-colors duration-400 hover:text-doe group-data-[solid=true]/bar:text-twilight group-data-[solid=true]/bar:hover:text-doe-deep"
              >
                {isActive(item.href) ? (
                  <span
                    aria-hidden="true"
                    className="block size-[5px] shrink-0 rounded-full bg-doe"
                  />
                ) : null}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3.5">
            <Link
              href="/contact-us"
              className="label-tight hidden items-center gap-2.5 rounded-full border border-edge-dark px-[22px] py-[11px] text-snow transition-[color,background-color,border-color,transform] duration-350 hover:border-doe hover:bg-doe hover:text-ink-deep motion-safe:hover:-translate-y-0.5 group-data-[solid=true]/bar:border-edge-light group-data-[solid=true]/bar:text-twilight group-data-[solid=true]/bar:hover:text-ink-deep min-[900px]:inline-flex"
            >
              Start a project
              <Dot />
            </Link>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpenAt((v) => (v === pathname ? null : pathname))}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Menu"}
              className="group/burger flex size-11 items-center justify-center rounded-full border border-edge-dark text-snow transition-colors duration-400 hover:border-doe group-data-[solid=true]/bar:border-edge-light group-data-[solid=true]/bar:text-twilight min-[900px]:hidden"
            >
              <span aria-hidden="true" className="flex w-4 flex-col gap-1">
                <span className="block h-px bg-current transition-transform duration-400 ease-brand motion-safe:group-hover/burger:-translate-y-0.5" />
                <span className="block h-px bg-current transition-transform duration-400 ease-brand motion-safe:group-hover/burger:translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-plate mobile menu, nav set large in Playfair. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        /*
          Scrollable, because the panel is a fixed full-viewport column and a
          phone held in landscape is only ~320-390px tall — shorter than the
          wordmark, the display-size nav and the CTA stacked together. Without
          this the "Start a project" button sits below the fold of a panel
          that does not scroll, and nothing can reach it.

          The nav's `my-auto` still centres the list whenever there IS spare
          room: flexbox resolves auto margins to zero once free space goes
          negative, so it stops centring exactly when centring would push the
          top of the content out of reach.
        */
        className="fixed inset-0 z-[400] flex flex-col overflow-y-auto overscroll-contain bg-ink-deep p-[clamp(1.25rem,4vw,2.5rem)]"
      >
        <div className="flex items-center justify-between">
          <Wordmark decorative className="h-7 w-auto text-snow" />
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="size-11 shrink-0 rounded-full border border-edge-dark text-lg leading-none text-snow"
          >
            &times;
          </button>
        </div>

        <nav
          aria-label="Primary (mobile)"
          className="my-auto flex flex-col gap-1.5"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              aria-current={isActive(item.href) ? "page" : undefined}
              style={{ "--panel-index": i } as React.CSSProperties}
              className="panel-item font-display text-[clamp(2.375rem,11vw,4rem)] leading-[1.1] text-snow"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact-us"
          onClick={close}
          className="label-tight block rounded-full bg-doe p-5 text-center text-ink-deep"
        >
          Start a project
        </Link>
        <p className="mt-[22px] text-center text-xs font-light tracking-[0.06em] text-mist-dim">
          {site.contact.address.street}, {site.contact.address.locality} · Serving
          UK · AUS · UAE
        </p>
      </div>
    </header>
  );
}
