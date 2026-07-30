import { LAWYER_NAME, OAB_NUMBER } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent py-10 md:py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl text-accent-foreground font-medium mb-1">
              {LAWYER_NAME}
            </p>
            <p className="text-accent-foreground/70 text-sm">
              {OAB_NUMBER}
            </p>
          </div>

          {/* Copyright */}
          <p className="text-accent-foreground/70 text-sm text-center">
            {currentYear} {LAWYER_NAME} Advocacia. Todos os direitos reservados.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a
              href="/politica-de-privacidade"
              className="text-accent-foreground/70 text-sm hover:text-accent-foreground transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos"
              className="text-accent-foreground/70 text-sm hover:text-accent-foreground transition-colors"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
