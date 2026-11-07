import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  getStoredConsent,
  onOpenCookiePreferences,
  ALL_CONSENT,
  RECOMMENDED_CONSENT,
  saveConsent,
  type ConsentPreferences,
} from '@/lib/analytics';

type BannerView = 'summary' | 'preferences';

const NO_OPTIONAL_COOKIES: ConsentPreferences = { analytics: false, ads: false };

interface PreferenceRowProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function PreferenceRow({ title, description, checked, disabled, onCheckedChange }: PreferenceRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-label={title}
      />
    </div>
  );
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(() => getStoredConsent() === null);
  const [view, setView] = useState<BannerView>('summary');
  const [preferences, setPreferences] = useState<ConsentPreferences>(
    () => getStoredConsent() ?? NO_OPTIONAL_COOKIES,
  );

  useEffect(
    () =>
      onOpenCookiePreferences(() => {
        setPreferences(getStoredConsent() ?? NO_OPTIONAL_COOKIES);
        setView('preferences');
        setIsVisible(true);
      }),
    [],
  );

  if (!isVisible) return null;

  const confirm = (choice: ConsentPreferences) => {
    saveConsent(choice);
    setIsVisible(false);
    setView('summary');
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 z-[60] rounded-lg border border-border bg-background p-5 shadow-card md:right-auto md:max-w-md"
    >
      {view === 'summary' ? (
        <>
          <p className="mb-4 text-sm text-foreground/80">
            Este site usa cookies de análise e de publicidade para medir o desempenho e melhorar a
            experiência. Você pode aceitar tudo, aceitar só os recomendados (análise) ou escolher quais
            permitir.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => confirm(ALL_CONSENT)}>Aceitar tudo</Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => confirm(RECOMMENDED_CONSENT)}>
                Aceitar recomendados
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setView('preferences')}>
                Personalizar
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4 font-serif text-xl text-foreground">Preferências de cookies</p>
          <div className="mb-5 space-y-4">
            <PreferenceRow
              title="Essenciais"
              description="Necessários para o site funcionar. Sempre ativos."
              checked
              disabled
            />
            <PreferenceRow
              title="Análise"
              description="Ajudam a entender como o site é usado."
              checked={preferences.analytics}
              onCheckedChange={(analytics) => setPreferences({ ...preferences, analytics })}
            />
            <PreferenceRow
              title="Publicidade"
              description="Medem o resultado dos anúncios e permitem mostrar anúncios relevantes."
              checked={preferences.ads}
              onCheckedChange={(ads) => setPreferences({ ...preferences, ads })}
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="flex-1" onClick={() => confirm(preferences)}>
              Salvar escolhas
            </Button>
            <Button className="flex-1" onClick={() => confirm(ALL_CONSENT)}>
              Aceitar tudo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
