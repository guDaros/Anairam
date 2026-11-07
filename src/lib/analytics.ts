// Mantenha este valor igual ao usado no script de Consent Mode do index.html
const CONSENT_STORAGE_KEY = 'cookie-consent';
const OPEN_COOKIE_PREFERENCES_EVENT = 'open-cookie-preferences';

export type ConsentPreferences = { analytics: boolean; ads: boolean };
export type Office = 'pr' | 'ba';

export const ALL_CONSENT: ConsentPreferences = { analytics: true, ads: true };
export const RECOMMENDED_CONSENT: ConsentPreferences = { analytics: true, ads: false };

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

function toConsentState(isGranted: boolean) {
  return isGranted ? 'granted' : 'denied';
}

export function getStoredConsent(): ConsentPreferences | null {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) ?? 'null');
    if (typeof stored?.analytics !== 'boolean' || typeof stored?.ads !== 'boolean') return null;
    return { analytics: stored.analytics, ads: stored.ads };
  } catch {
    return null;
  }
}

export function saveConsent(preferences: ConsentPreferences) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Sem armazenamento disponível: a escolha vale apenas até recarregar a página
  }

  const adsState = toConsentState(preferences.ads);
  gtag('consent', 'update', {
    ad_storage: adsState,
    ad_user_data: adsState,
    ad_personalization: adsState,
    analytics_storage: toConsentState(preferences.analytics),
  });
  pushEvent('consent_update', {
    consent_analytics: toConsentState(preferences.analytics),
    consent_ads: adsState,
  });
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
}

export function onOpenCookiePreferences(listener: () => void) {
  window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, listener);
  return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, listener);
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
