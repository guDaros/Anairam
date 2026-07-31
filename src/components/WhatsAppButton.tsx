import { WHATSAPP_LINK_PR } from '@/lib/constants';

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK_PR}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg animate-pulse-soft transition-colors duration-300"
      aria-label="Fale no WhatsApp"
    >
      <i className="fa-brands fa-whatsapp text-3xl text-white" aria-hidden="true"></i>
    </a>
  );
}
