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
  {
    icon: 'gavel_precedent',
    title: 'Recuperação de Crédito',
    description: 'Ações de execução, cobrança e monitória para empresas que precisam recuperar valores de devedores. Atuação especializada, incluindo localização de ativos e bens do devedor.',
  },
];

export function AreasAtuacaoB2B() {
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
      className="py-20 md:py-28 bg-background bg-muted"
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
            Consultoria para Escritórios de Advocacia
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Presto serviço especializado de análise de viabilidade e elaboração de dossiês de recuperação de crédito para outros escritórios, incluindo localização de ativos e bens do devedor e elaboração da peça inicial.
          </p>
        </div>
      </div>
    </section>
  );
}
