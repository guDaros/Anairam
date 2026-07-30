import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqItems = [
  {
    question: 'Quanto custa uma consulta?',
    answer: 'O valor da consulta inicial é de R$ 350,00, com duração de até 1 hora. Durante esse encontro, analisamos seu caso, explicamos suas opções legais e traçamos a melhor estratégia. Em alguns casos, é possível resolver a questão já na primeira consulta.',
  },
  {
    question: 'Quanto tempo demora um processo judicial?',
    answer: 'O tempo varia conforme a complexidade do caso e o tipo de ação. Processos simples podem ser resolvidos em poucos meses, enquanto ações mais complexas podem levar de 1 a 3 anos. Oferecemos acompanhamento constante para manter você informado sobre cada etapa.',
  },
  {
    question: 'Quais documentos preciso para abrir um processo?',
    answer: 'Os documentos variam conforme o tipo de ação. Geralmente são necessários: RG, CPF, comprovante de residência, contratos e documentos relacionados ao caso. Na consulta inicial, orientamos exatamente o que será necessário para o seu caso específico.',
  },
  {
    question: 'Você atende online?',
    answer: 'Sim, ofereço atendimento online por videoconferência para consultas, reuniões e acompanhamento de processos. É uma opção segura, prática e com a mesma qualidade do atendimento presencial, ideal para quem tem agenda apertada ou está em outra cidade.',
  },
  {
    question: 'Como funciona o processo de indenização por danos?',
    answer: 'O processo de indenização busca reparar prejuízos materiais ou morais causados por terceiros. Após análise do caso, reunimos provas e ingressamos com a ação judicial. O valor da indenização é calculado com base nos danos comprovados e na jurisprudência.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-background"
      aria-labelledby="faq-title"
    >
      <div className="container">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-16 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2
            id="faq-title"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Respostas claras para suas principais dúvidas
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <button
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-foreground pr-4">
                  {item.question}
                </span>
                <span
                  className={`material-symbols-outlined text-xl text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                  aria-hidden="true"
                >
                  add
                </span>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
