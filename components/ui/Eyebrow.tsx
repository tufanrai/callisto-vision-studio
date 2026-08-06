/**
 * The section marker: a Doe Brown dot, a wide-tracked label, and — in the
 * footer and the marquee headers — a rule that runs out to the edge.
 *
 * The design opens all but one section with this device, so it is a
 * component rather than three spans repeated forty times.
 */
export function Eyebrow({
  children,
  tone = "dark",
  rule = false,
  className,
}: {
  children: React.ReactNode;
  /** Which ground it sits on — `dark` = ink-deep/twilight, `light` = snow/pure. */
  tone?: "dark" | "light";
  /** Trail a gradient rule out to the container edge. */
  rule?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <span
        aria-hidden="true"
        className="block size-1.5 shrink-0 rounded-full bg-doe"
      />
      <span
        className={`label ${tone === "dark" ? "text-mist" : "text-ink-muted"}`}
      >
        {children}
      </span>
      {rule ? (
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-linear-to-r from-doe/50 to-snow/10"
        />
      ) : null}
    </div>
  );
}

/**
 * The trailing dot carried by every pill and every underlined link. Inherits
 * the current colour so it inverts with its parent on hover.
 */
export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block size-[5px] shrink-0 rounded-full bg-current ${className ?? ""}`}
    />
  );
}
