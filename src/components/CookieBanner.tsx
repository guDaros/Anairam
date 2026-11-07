import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getStoredConsent, saveConsent, type ConsentChoice } from '@/lib/analytics';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(() => getStoredConsent() === null);

  if (!isVisible) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setIsVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 z-[60] rounded-lg border border-border bg-background p-5 shadow-card md:right-auto md:max-w-md"
    >
      <p className="mb-4 text-sm text-foreground/80">
        Este site usa cookies de análise e de publicidade para medir o desempenho e melhorar a
        experiência. Você pode aceitar ou recusar; o site funciona normalmente nos dois casos.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => choose('denied')}>
          Recusar
        </Button>
        <Button className="flex-1" onClick={() => choose('granted')}>
          Aceitar
        </Button>
      </div>
    </div>
  );
}
