import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "./wordmark-path";

/**
 * The full wordmark. Inherits colour from its parent, so it sits on either a
 * dark or a light plate without shipping a second asset.
 *
 * `title` is omitted when decorative — callers that pair it with visible text
 * pass `decorative` so screen readers do not hear the studio name twice.
 */
export function Wordmark({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}
      className={className}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Callisto Vision Studio"}
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={WORDMARK_PATH} />
    </svg>
  );
}

/**
 * The crescent taken from the wordmark's initial C — a disc minus a larger
 * offset disc, fitted to the supplied logo to under 1.5px RMS error.
 * Used wherever the full wordmark is too wide to set.
 */
export function Crescent({
  className,
  thickened = false,
}: {
  className?: string;
  /** Optically thickened variant, for small sizes where the true crescent thins out. */
  thickened?: boolean;
}) {
  /**
   * Generated from the fitted circles, not eyeballed: the true crescent is
   * disc(r=1) minus disc(offset 0.1166,-0.1804, r=1.1036). The thickened
   * variant shrinks the cutting disc to r=1.0560, roughly a 40% heavier
   * stroke, so the shape survives at 16–32px.
   */
  const d = thickened
    ? "M6.00,34.73a50.66,50.66 0 1,1 101.32,0a50.66,50.66 0 1,1 -101.32,0ZM9.07,25.59a53.49,53.49 0 1,0 106.99,0a53.49,53.49 0 1,0 -106.99,0Z"
    : "M4.00,25.01a59.41,59.41 0 1,1 118.82,0a59.41,59.41 0 1,1 -118.82,0ZM4.77,14.29a65.56,65.56 0 1,0 131.13,0a65.56,65.56 0 1,0 -131.13,0Z";
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={d} />
    </svg>
  );
}
