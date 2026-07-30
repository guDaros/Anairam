import { useScrollAnimationMultiple, useScrollAnimation } from '@/hooks/useScrollAnimation';

const formacao = [
  {
    year: '2024',
    title: 'Pós-Graduação em Direito de Família',
    institution: 'PUC-SP',
    description: 'Especialização em Direito de Família e Sucessões, com ênfase em mediação familiar.',
  },
  {
    year: '2023',
    title: 'Curso de Mediação Familiar',
    institution: 'IASP',
    description: 'Formação em técnicas de mediação e resolução consensual de conflitos familiares.',
  },
  {
    year: '2022',
    title: 'Bacharel em Direito',
    institution: 'USP',
    description: 'Graduação em Direito pela Universidade de São Paulo, com foco em Direito Civil.',
  },
];

export function Formacao() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setRef, visibleItems } = useScrollAnimationMultiple(formacao.length, {
    threshold: 0.3,
  });

  return (
    <section
      id="formacao"
      className="py-20 md:py-28 bg-muted"
      aria-labelledby="formacao-title"
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
            id="formacao-title"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Formação Acadêmica
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Educação continuada e especialização para oferecer o melhor atendimento
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line - hidden on mobile */}
            <div
              className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border"
              aria-hidden="true"
            />

            {/* Timeline items */}
            <div className="space-y-6 md:space-y-8">
              {formacao.map((item, index) => (
                <div
                  key={item.year}
                  ref={setRef(index)}
                  className={`relative ${
                    visibleItems[index] ? 'animate-fade-in-left' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Desktop layout with timeline */}
                  <div className="hidden md:flex items-start gap-8">
                    {/* Year circle */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-medium text-sm">
                        {item.year}
                      </span>
                    </div>

                    {/* Content card */}
                    <div className="flex-1 bg-card rounded-lg p-6 shadow-soft card-hover">
                      <h3 className="font-serif text-xl font-medium text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-primary font-medium text-sm mb-2">
                        {item.institution}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile layout - list style */}
                  <div className="md:hidden bg-card rounded-lg p-5 shadow-soft">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {item.year}
                      </span>
                      <span className="text-primary font-medium text-sm">
                        {item.institution}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
