import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg2.png';

export function Hero() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleScrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: 'scale(1.1)'
        }}
        aria-hidden="true"
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/43 to-primary/20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
          {/* Tagline */}
          <p
            className={`text-sm md:text-base font-medium text-primary tracking-widest uppercase mb-4 md:mb-6 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
             DIREITO CIVIL, DIREITO DO CONSUMIDOR E RECUPERAÇÃO DE CRÉDITO
          </p>

          {/* Main Title */}
          <h1
            id="hero-title"
            className={`font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-foreground mb-6 md:mb-8 ${
              isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'
            }`}
          >
            Estratégia Jurídica
            <br />
            
            <span className="text-primary">Resultados</span> Concretos
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#4A3F38] max-w-2xl mb-8 md:mb-10 animate-fade-in-up delay-200">
            Recuperação de crédito <br/>
            Execução de Títulos <br/>
            Investigação de Patrimonial<br/>
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start ${
              isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'
            }`}
          >
            <Button
              size="lg"
              className="ripple text-base px-8 py-6"
              onClick={() => handleScrollToSection('#contato')}
            >
              <span className="material-symbols-outlined text-xl mr-2" aria-hidden="true">
                chat
              </span>
              Fale com a Advogada
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 border-primary/30 hover:border-primary hover:bg-primary/5"
              onClick={() => handleScrollToSection('#areas')}
            >
              <span className="material-symbols-outlined text-xl mr-2" aria-hidden="true">
                gavel
              </span>
              Ver áreas de atuação
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <span className="material-symbols-outlined text-3xl text-primary/60">
          expand_more
        </span>
      </div>
    </section>
  );
}
