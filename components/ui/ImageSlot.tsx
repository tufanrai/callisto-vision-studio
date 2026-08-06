import Image from "next/image";
import { Crescent } from "@/components/brand/Wordmark";

/**
 * A framed image position.
 *
 * The design composes its pages out of `<image-slot>` elements — a fixed
 * aspect frame that either holds artwork or, until the studio drops one in,
 * states what belongs there. This is the production equivalent.
 *
 * The empty state is deliberately a designed panel rather than a dashed
 * "drop here" box: on a live site an unfilled slot must read as *pending*,
 * not as broken markup or a failed request. It carries the crescent at low
 * opacity and the slot's own description, so an unfinished page still looks
 * like the studio's work.
 *
 * The caller owns the frame's size and aspect ratio; the slot fills it.
 */
export function ImageSlot({
  src,
  alt,
  hint,
  tone = "light",
  fit = "cover",
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority = false,
  className,
}: {
  /** Artwork path under /public. Omit for the pending state. */
  src?: string;
  /** Required whenever `src` is set. Pass "" for purely decorative artwork. */
  alt?: string;
  /** What belongs in this slot — shown while it is empty. */
  hint: string;
  /** Which ground the frame sits on. */
  tone?: "light" | "dark";
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        className={`${fit === "cover" ? "object-cover" : "object-contain"} ${className ?? ""}`}
      />
    );
  }

  return (
    <div
      // Pending artwork carries no information a screen reader needs; the
      // surrounding heading and copy already name the work.
      aria-hidden="true"
      /*
        The ground is opaque, not a tint over whatever the caller set. A
        translucent panel composites against a background this component
        cannot see, so its text contrast would depend on the call site — and
        the same markup would pass on one page and fail on the next.
      */
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden p-5 text-center ${
        tone === "dark"
          ? "bg-ink-raised text-mist"
          : "bg-rule-light text-ink-soft"
      } ${className ?? ""}`}
    >
      <Crescent
        thickened
        className={`size-7 shrink-0 ${tone === "dark" ? "text-doe/45" : "text-doe-deep/35"}`}
      />
      <span className="label-tight max-w-full text-[0.625rem] leading-relaxed text-balance">
        {hint}
      </span>
    </div>
  );
}
