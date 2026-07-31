import { useScrollAnimationMultiple, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { WHATSAPP_LINK_PR } from '@/lib/constants';

const dicas = [
  {
    icon: 'balance',
    title: 'Processo Civil',
    content: 'Atuação em ações judiciais como cobrança, execução de títulos, ações de despejo, revisão de contratos e demais procedimentos cíveis para garantir seus direitos.',
  },
  {
    icon: 'gavel',
    title: 'Direito Civil',
    content: 'Assessoria completa em contratos, responsabilidade civil, direito de propriedade, sucessões, inventários e todas as questões do cotidiano jurídico.',
  },
  {
    icon: 'shield',
    title: 'Direito do Consumidor',
    content: 'Defesa dos seus direitos nas relações de consumo: produtos defeituosos, cobranças indevidas, contratos abusivos e indenizações por danos.',
  },
];

export function Dicas() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setRef, visibleItems } = useScrollAnimationMultiple(dicas.length, {
    threshold: 0.2,
  });

  return (
    <section
      id="dicas"
      className="py-20 md:py-28 bg-muted"
      aria-labelledby="dicas-title"
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
            id="dicas-title"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Dicas Úteis
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Informações importantes para você entender seus direitos
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {dicas.map((dica, index) => (
            <article
              key={dica.title}
              ref={setRef(index)}
              className={`group bg-card rounded-lg p-6 md:p-8 shadow-soft card-hover ${
                visibleItems[index] ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <span
                  className="material-symbols-outlined text-xl text-primary group-hover:text-primary-foreground transition-colors"
                  aria-hidden="true"
                >
                  {dica.icon}
                </span>
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                {dica.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {dica.content}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 ${
            headerVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'
          }`}
        >
          <p className="text-foreground text-lg mb-4">
            Quer orientação no seu caso?
          </p>
          <a
            href={WHATSAPP_LINK_PR}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chat
            </span>
            Fale comigo
          </a>
        </div>
      </div>
    </section>
  );
}
