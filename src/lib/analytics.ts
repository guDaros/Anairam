// Mantenha este valor igual ao usado no script de Consent Mode do index.html
const CONSENT_STORAGE_KEY = 'cookie-consent';

export type ConsentChoice = 'granted' | 'denied';
export type Office = 'pr' | 'ba';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

// O GTM só reconhece comandos do gtag quando recebem o objeto `arguments`, não um array
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function pushEvent(event: string, params: Record<string, string> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function getStoredConsent(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Sem armazenamento disponível: a escolha vale apenas até recarregar a página
  }

  gtag('consent', 'update', {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
  pushEvent('consent_update', { consent_choice: choice });
}

export function trackWhatsAppClick(clickLocation: string, office: Office) {
  pushEvent('whatsapp_click', { click_location: clickLocation, office });
}

export function trackVirtualPageView(path: string) {
  pushEvent('virtual_page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
