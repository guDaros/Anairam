import type { InstagramPost } from '@/hooks/useInstagramPosts';

const MAX_ALT_TEXT_LENGTH = 120;

interface InstagramPostCardProps {
  post: InstagramPost;
}

function buildAltText(post: InstagramPost) {
  const caption = post.prunedCaption?.trim();
  if (!caption) return 'Publicação do Instagram';
  return caption.length > MAX_ALT_TEXT_LENGTH ? `${caption.slice(0, MAX_ALT_TEXT_LENGTH)}…` : caption;
}

export function InstagramPostCard({ post }: InstagramPostCardProps) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir publicação no Instagram"
      className="group relative block aspect-square overflow-hidden rounded-lg bg-muted"
    >
      <img
        src={post.sizes.medium.mediaUrl}
        alt={buildAltText(post)}
        loading="lazy"
        width={700}
        height={700}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-accent/0 transition-colors duration-300 group-hover:bg-accent/40">
        <i
          className="fa-brands fa-instagram text-3xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        ></i>
      </div>

      {post.mediaType === 'VIDEO' && (
        <span
          className="material-symbols-outlined absolute right-2 top-2 text-2xl text-white drop-shadow"
          aria-hidden="true"
        >
          play_circle
        </span>
      )}
      {post.mediaType === 'CAROUSEL_ALBUM' && (
        <span
          className="material-symbols-outlined absolute right-2 top-2 text-2xl text-white drop-shadow"
          aria-hidden="true"
        >
          filter_none
        </span>
      )}
    </a>
  );
}
