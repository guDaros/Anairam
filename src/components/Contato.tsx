import { useState } from 'react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { EMAIL, OAB_NUMBER_PR, WHATSAPP_DISPLAY_PR, WHATSAPP_LINK_PR, INSTAGRAM, INSTAGRAM_HANDLE, WHATSAPP_LINK_BH, OAB_NUMBER_BA, WHATSAPP_DISPLAY_BH } from '@/lib/constants';

// TODO: substitua pelos dados reais de cada unidade
const OFFICES = [
  {
    estado: 'Bahia',
    office: 'ba' as const,
    oab: OAB_NUMBER_BA,
    endereco: 'Rua Exemplo, 000 - Bairro, Salvador - BA, CEP 00000-000',
    telefone: WHATSAPP_DISPLAY_BH,
    whatsappLink: WHATSAPP_LINK_BH,
  },
  {
    estado: 'Paraná',
    office: 'pr' as const,
    oab: OAB_NUMBER_PR,
    telefone: WHATSAPP_DISPLAY_PR,
    whatsappLink: WHATSAPP_LINK_PR,
  },
];

const TEMPO_FEEDBACK_COPIA_MS = 2000;

export function Contato() {
  const { ref, isVisible } = useScrollAnimation();
  const [emailCopiado, setEmailCopiado] = useState(false);

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopiado(true);
      setTimeout(() => setEmailCopiado(false), TEMPO_FEEDBACK_COPIA_MS);
    } catch {
      window.prompt('Copie o e-mail:', EMAIL);
    }
  };

  return (
    <section
      id="contato"
      className="py-20 md:py-28 bg-background"
      aria-labelledby="contato-title"
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
            id="contato-title"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Entre em Contato
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Atendimento na Bahia e no Paraná. Escolha a unidade mais próxima de você
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 max-w-5xl mx-auto">
          {OFFICES.map((escritorio, index) => (
            <div
              key={escritorio.estado}
              className={`bg-muted rounded-lg p-6 md:p-8 w-full max-w-md ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${100 + index * 100}ms` }}
            >
              <h3 className="font-serif text-2xl font-medium text-foreground mb-1">
                {escritorio.estado}
              </h3>
              <p className="text-sm text-primary font-medium mb-6">
                {/* {escritorio.oab} */}
              </p>

              <div className="space-y-6">
                {/* <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-foreground" aria-hidden="true">
                      location_on
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Endereço</p>
                    <p className="text-muted-foreground">{escritorio.endereco}</p>
                  </div>
                </div> */}

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-foreground" aria-hidden="true">
                      call
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Telefone</p>
                    <p className="text-muted-foreground">{escritorio.telefone}</p>
                  </div>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <Button asChild className="w-full ripple">
                  <a
                    href={escritorio.whatsappLink}
                    onClick={() => trackWhatsAppClick(`contato_${escritorio.office}`, escritorio.office)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp text-lg mr-2" aria-hidden="true"></i>
                    Chamar no WhatsApp - {escritorio.estado}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-12">
          <button
            type="button"
            onClick={copiarEmail}
            title="Clique para copiar o e-mail"
            className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-primary" aria-hidden="true">
              {emailCopiado ? 'check' : 'mail'}
            </span>
            {EMAIL}
            <span className="text-sm text-primary" role="status">
              {emailCopiado ? 'Copiado!' : ''}
            </span>
          </button>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
          >
            <i className="fa-brands fa-instagram text-lg text-primary" aria-hidden="true"></i>
            {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </section>
  );
}
