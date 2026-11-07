import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useInstagramPosts } from '@/hooks/useInstagramPosts';
import { InstagramPostCard } from '@/components/instagram/InstagramPostCard';
import { Button } from '@/components/ui/button';
import { INSTAGRAM, INSTAGRAM_HANDLE } from '@/lib/constants';

const SKELETON_TILES_COUNT = 6;
const GRID_CLASSES = 'grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto';

function PostsGrid() {
  const { data: posts, isPending, isError } = useInstagramPosts();

  if (isPending) {
    return (
      <div className={GRID_CLASSES} aria-busy="true">
        {Array.from({ length: SKELETON_TILES_COUNT }, (_, index) => (
          <div key={index} className="aspect-square rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError || posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Não foi possível carregar as publicações agora. Veja o conteúdo direto no Instagram.
      </p>
    );
  }

  return (
    <div className={GRID_CLASSES}>
      {posts.map((post) => (
        <InstagramPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export function Instagram() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="instagram"
      className="py-20 md:py-28 bg-background"
      aria-labelledby="instagram-title"
    >
      <div className="container">
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-16 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2
            id="instagram-title"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Instagram
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Acompanhe as publicações no {INSTAGRAM_HANDLE}
          </p>
        </div>

        <PostsGrid />

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/5">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram text-lg mr-2" aria-hidden="true"></i>
              Ver mais no Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
