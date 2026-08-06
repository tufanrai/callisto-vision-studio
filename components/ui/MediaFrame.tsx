import { ImageSlot } from "./ImageSlot";
import { VideoSlot } from "./VideoSlot";

/**
 * One frame, filled by whatever the project actually has.
 *
 * Roughly half the studio's work moves and half doesn't, and both appear in
 * the same grids. Rather than every section branching on it, a frame takes
 * the project's media and decides: a `video` slug plays the silent loop, a
 * `src` renders the still, and neither falls back to the pending panel.
 *
 * The caller still owns the frame — its size, aspect ratio and ground. This
 * only fills it.
 */
export function MediaFrame({
  video,
  src,
  alt,
  hint,
  title,
  tone = "light",
  fit = "cover",
  sizes,
  priority = false,
  className,
}: {
  video?: string;
  src?: string;
  alt?: string;
  hint: string;
  /** Names the work for the video's play control. Required when `video` is set. */
  title?: string;
  tone?: "light" | "dark";
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (video) {
    return (
      <VideoSlot
        slug={video}
        title={title ?? hint}
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <ImageSlot
      src={src}
      alt={alt}
      hint={hint}
      tone={tone}
      fit={fit}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
