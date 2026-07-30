import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LAWYER_NAME, WHATSAPP_LINK } from '@/lib/constants';
import logoImg from '@/assets/logo.png';

const navLinks = [
  { label: 'Por Que Me Escolher', href: '#diferenciais' },
  { label: 'Áreas de Atuação', href: '#areas' },
  { label: 'Formação', href: '#formacao' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-soft py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container flex items-center justify-between" aria-label="Navegação principal">
        <a 
          href="#hero" 
          className="flex items-center shrink-0 bg-transparent rounded-none"
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Anairam Souza Advocacia - Início"
        >
          {/* Logo - use arquivo PNG com fundo transparente em src/assets/logo.png para não aparecer fundo preto */}
          <img
            src={logoImg}
            alt="Anairam Souza Advocacia"
            className="h-12 md:h-14 w-auto object-contain [background:transparent]"
          />
          {/* Nome em texto (comentado - substituído pelo logo)
          <span className="font-serif text-xl md:text-2xl font-semibold text-primary">
            {LAWYER_NAME}
          </span>
          */}
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                role="menuitem"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button asChild variant="default" className="ripple">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fale no WhatsApp"
            >
              <i className="fa-brands fa-whatsapp text-lg mr-2" aria-hidden="true"></i>
              Fale no WhatsApp
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background shadow-card lg:hidden">
            <ul className="flex flex-col py-4" role="menu">
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    className="block px-6 py-3 text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="px-4 pt-4" role="none">
                <Button asChild variant="default" className="w-full ripple">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fale no WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp text-lg mr-2" aria-hidden="true"></i>
                    Fale no WhatsApp
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
