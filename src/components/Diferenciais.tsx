import { useScrollAnimationMultiple } from '@/hooks/useScrollAnimation';

const diferenciais = [
  {
    icon: 'school',
    title: 'Formação Especializada',
    description: 'Especialização em Direito Civil e Processual Civil, com foco em contratos e relações de consumo.',
  },
  {
    icon: 'event_available',
    title: 'Primeira Consulta',
    description: 'Explicação clara sobre como funciona o processo, prazos, custos e estratégias possíveis para o seu caso.',
  },
  {
    icon: 'favorite',
    title: 'Atendimento Humanizado',
    description: 'Escuta ativa e empatia para compreender suas necessidades e oferecer o suporte que você precisa.',
  },
  {
    icon: 'speed',
    title: 'Acompanhamento Ágil',
    description: 'Atendimento presencial e online, com respostas rápidas e atualizações constantes sobre o seu processo.',
  },
];

export function Diferenciais() {
  const { setRef, visibleItems } = useScrollAnimationMultiple(diferenciais.length, {
    threshold: 0.2,
  });

  return (
    <section
      id="diferenciais"
      className="py-20 md:py-28 bg-muted"
      aria-labelledby="diferenciais-title"
    >
      <div className="container">
        {/* Section Header */}
        {/*<div className="text-center mb-12 md:mb-16">
          
          <h2
            id="diferenciais-title"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Por que me escolher?
          </h2>


          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experiência, dedicação e um compromisso genuíno com o seu bem-estar
          </p>
        </div>*/}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {diferenciais.map((item, index) => (
            <article
              key={item.title}
              ref={setRef(index)}
              className={`bg-card rounded-lg p-6 md:p-8 shadow-soft card-hover ${
                visibleItems[index] ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <span
                  className="material-symbols-outlined text-2xl text-primary"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
