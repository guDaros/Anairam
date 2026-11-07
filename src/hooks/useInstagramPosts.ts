import { useQuery } from '@tanstack/react-query';
import { INSTAGRAM_FEED_URL } from '@/lib/constants';

export type InstagramPost = {
  id: string;
  permalink: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  prunedCaption?: string;
  sizes: { medium: { mediaUrl: string } };
};

const THIRTY_MINUTES_MS = 30 * 60 * 1000;

async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const response = await fetch(INSTAGRAM_FEED_URL);
  if (!response.ok) {
    throw new Error(`Falha ao carregar o feed do Instagram (HTTP ${response.status})`);
  }

  const feed = await response.json();
  if (!Array.isArray(feed.posts)) {
    throw new Error('Resposta inesperada do feed do Instagram');
  }

  return feed.posts;
}

export function useInstagramPosts() {
  return useQuery({
    queryKey: ['instagram-posts'],
    queryFn: fetchInstagramPosts,
    staleTime: THIRTY_MINUTES_MS,
  });
}
