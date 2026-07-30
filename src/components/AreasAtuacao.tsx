import { useScrollAnimationMultiple, useScrollAnimation } from '@/hooks/useScrollAnimation';

const areas = [
  {
    icon: 'balance',
    title: 'Processo Civil',
    description: 'Ações de cobrança, execução de títulos, despejo, revisão contratual e demais procedimentos para garantir seus direitos na esfera cível.',
  },
  {
    icon: 'gavel',
    title: 'Direito Civil',
    description: 'Contratos, responsabilidade civil, direito de propriedade, sucessões, inventários e todas as questões do cotidiano jurídico.',
  },
  {
    icon: 'shield',
    title: 'Direito do Consumidor',
    description: 'Defesa nas relações de consumo: produtos defeituosos, cobranças indevidas, contratos abusivos e ações de indenização.',
  },
  {
    icon: 'description',
    title: 'Contratos e Acordos',
    description: 'Elaboração, análise e revisão de contratos particulares, acordos comerciais e instrumentos jurídicos diversos.',
  },
];

export function AreasAtuacao() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setRef, visibleItems } = useScrollAnimationMultiple(areas.length, {
    threshold: 0.2,
  });

  const getAnimationClass = (index: number) => {
    if (index === 0) return 'animate-fade-in-left';
    if (index === areas.length - 1) return 'animate-fade-in-right';
    return 'animate-fade-in-up';
  };

  return (
    <section
      id="areas"
      className="py-20 md:py-28 bg-background"
      aria-labelledby="areas-title"
    >
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2
            id="areas-title"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Áreas de Atuação
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Atuação especializada em Processo Civil, Direito Civil e Direito do Consumidor, 
            com foco em soluções práticas e resultados efetivos
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {areas.map((area, index) => (
            <article
              key={area.title}
              ref={setRef(index)}
              className={`group bg-card border border-border rounded-lg p-6 md:p-8 card-hover ${
                visibleItems[index] ? getAnimationClass(index) : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary transition-colors duration-300">
                  <span
                    className="material-symbols-outlined text-xl text-primary-foreground"
                    aria-hidden="true"
                  >
                    {area.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
