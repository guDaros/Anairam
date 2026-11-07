import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/fundodetela.jpeg';

export function Hero2() {
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
      {/* Background */}
      <div
        // No desktop a imagem é ampliada e ancorada à esquerda para o logo em relevo ficar à direita, longe do texto
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-[length:125%] md:bg-[position:left_50%]"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      {/* Tratamento: escurece só onde está o texto e deixa o logo da imagem aparecer à direita */}
      <div
        className="absolute inset-0 bg-accent/55 md:bg-transparent md:bg-gradient-to-r md:from-accent/75 md:via-accent/40 md:to-transparent"
        aria-hidden="true"
      />

      {/* Vinheta sutil nas bordas para dar profundidade */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
          {/* Tagline */}
          <p
            className={`text-sm md:text-base font-medium text-ouro tracking-widest uppercase mb-4 md:mb-6 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {/* DIREITO CIVIL, DIREITO DO CONSUMIDOR E RECUPERAÇÃO DE CRÉDITO */}
          </p>

          {/* Main Title */}
          <h1
            id="hero-title"
            className={`font-serif text-[2rem] md:text-[2.6rem] lg:text-[3.25rem] xl:text-[4rem] font-medium leading-9 md:leading-none text-white mb-6 md:mb-8 ${
              isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
          >
            Estratégia Jurídica
            <br />
            <span className="text-ouro">com Rigor</span> Técnico
          </h1>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start ${
              isVisible ? "animate-fade-in-up delay-300" : "opacity-0"
            }`}
          >
            {/* <Button
              size="lg"
              className="ripple text-base px-8 py-6 bg-white text-primary hover:bg-white/90"
              onClick={() => handleScrollToSection("#contato")}
            >
              <span
                className="material-symbols-outlined text-xl mr-2"
                aria-hidden="true"
              >
                chat
              </span>
              Fale com a Advogada
            </Button> */}
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10 hover:text-white"
              onClick={() => handleScrollToSection("#contato")}
            >
              <span
                className="material-symbols-outlined text-xl mr-2"
                aria-hidden="true"
              >
                gavel
              </span>
              Fale com a Advogada
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10 hover:text-white"
              onClick={() => handleScrollToSection("#areas")}
            >
              <span
                className="material-symbols-outlined text-xl mr-2"
                aria-hidden="true"
              >
                gavel
              </span>
              Ver áreas de atuação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
