import { useEffect } from 'react';
import { LinkButton } from '@/components/links/LinkButton';
import { LinksFooter } from '@/components/links/LinksFooter';
import { LINKS_SITE_URL, LINKS_WHATSAPP_BA, LINKS_WHATSAPP_PR } from '@/lib/constants';
import logoImg from '@/assets/logo-links.png';

const PAGE_TITLE = 'Anairam Souza Advocacia';
const PAGE_DESCRIPTION =
  'Direito do Consumidor, Direito Cível e Recuperação de Crédito. Paraná, Bahia e on-line para todo o Brasil.';

const links = [
  { label: 'WhatsApp Paraná', href: LINKS_WHATSAPP_PR },
  { label: 'WhatsApp Bahia', href: LINKS_WHATSAPP_BA },
  { label: 'Site', href: LINKS_SITE_URL },
];

const FaleComigo = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionTag?.content;

    document.title = PAGE_TITLE;
    if (descriptionTag) descriptionTag.content = PAGE_DESCRIPTION;

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription !== undefined) {
        descriptionTag.content = previousDescription;
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-14 font-montserrat font-light text-vinho">
      <main className="w-full max-w-[340px] text-center">
        <img
          src={logoImg}
          alt="Anairam Souza Advocacia"
          className="mx-auto mb-14 block h-auto w-[210px] max-w-[70%]"
        />

        <nav aria-label="Links de contato" className="flex flex-col gap-[14px]">
          {links.map((link) => (
            <LinkButton key={link.label} href={link.href}>
              {link.label}
            </LinkButton>
          ))}
        </nav>

        <LinksFooter />
      </main>
    </div>
  );
};

export default FaleComigo;
