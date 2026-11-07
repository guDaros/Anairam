import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVirtualPageView } from '@/lib/analytics';

// A primeira página já é contada pelo GTM no carregamento; aqui entram só as trocas de rota
export function RouteTracker() {
  const { pathname, search } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Adia um ciclo para a página nova atualizar o document.title antes do envio
    const timeout = setTimeout(() => trackVirtualPageView(pathname + search), 0);
    return () => clearTimeout(timeout);
  }, [pathname, search]);

  return null;
}
