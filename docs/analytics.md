# Analytics, consentimento e Google Ads

O site usa o **Google Tag Manager (GTM)**, contêiner `GTM-PS779W82`, para medir visitas e
conversões do Google Ads. O site apenas envia **eventos** ao `dataLayer`; quais tags disparam
(Analytics, Google Ads) é configurado no painel do GTM, sem mexer no código.

## Como funciona

```
index.html: Consent Mode (tudo negado) ──► GTM ──► tags do GA4 / Google Ads
                  ▲                          ▲
   banner de cookies (aceitar/recusar)       eventos do site (whatsapp_click, virtual_page_view)
```

1. **`index.html`** define o Consent Mode como *negado* para `ad_storage`, `ad_user_data`,
   `ad_personalization` e `analytics_storage` **antes** de carregar o GTM. Se o visitante já aceitou
   antes (guardado em `localStorage`, chave `cookie-consent`), o consentimento é restaurado na hora.
2. **`CookieBanner`** aparece até o visitante escolher. *Aceitar* ou *Recusar* atualiza o consentimento
   (`gtag('consent', 'update', ...)`) e envia o evento `consent_update`.
3. **`RouteTracker`** envia `virtual_page_view` a cada troca de rota do React Router.
4. Os links de WhatsApp enviam `whatsapp_click`.

Com o consentimento negado, as tags do Google rodam em modo limitado, sem cookies de marketing.

## Eventos enviados ao `dataLayer`

| Evento | Quando | Parâmetros |
|---|---|---|
| `whatsapp_click` | Clique em qualquer link de WhatsApp | `click_location`, `office` |
| `virtual_page_view` | Troca de rota (não dispara na primeira página) | `page_path`, `page_location`, `page_title` |
| `consent_update` | Visitante aceita ou recusa os cookies | `consent_choice` (`granted` ou `denied`) |

Valores de `click_location`: `menu_desktop`, `menu_mobile`, `botao_flutuante`, `contato_pr`,
`contato_ba` e `pagina_de_links`. Valores de `office`: `pr` (Paraná) e `ba` (Bahia).

## Configuração no painel do GTM

Em [tagmanager.google.com](https://tagmanager.google.com), no contêiner `GTM-PS779W82`:

### Gatilhos
- **Evento personalizado `whatsapp_click`**: nome do evento `whatsapp_click`.
- **Evento personalizado `virtual_page_view`**: nome do evento `virtual_page_view`.

### Variáveis (Variável da camada de dados)
`click_location`, `office`, `page_path`, `page_location` e `page_title`.

### Tags
1. **Google Analytics: Configuração do GA4**, com o ID `G-` da propriedade, gatilho **All Pages**
   (conta a primeira página).
2. **Google Analytics: Evento GA4** `page_view` com os parâmetros `page_location` e `page_title`,
   gatilho `virtual_page_view` (conta as trocas de rota).
3. **Google Analytics: Evento GA4** `whatsapp_click` com os parâmetros `click_location` e `office`,
   gatilho `whatsapp_click`.
4. **Google Ads: Acompanhamento de conversões**, com o ID `AW-` e o rótulo da conversão criada no
   Google Ads, gatilho `whatsapp_click`.
5. *(Opcional)* **Google Ads: Remarketing**, gatilho All Pages.

Em **Configurações de consentimento** de cada tag de marketing, exija `ad_storage`
(e `analytics_storage` nas tags do GA4).

### Publicar
Use **Visualizar** para testar (abra o site, aceite os cookies e clique no WhatsApp) e depois
**Enviar** para publicar.

## Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Consent Mode padrão e snippet do GTM |
| `src/lib/analytics.ts` | Consentimento (`getStoredConsent`, `saveConsent`) e eventos (`trackWhatsAppClick`, `trackVirtualPageView`) |
| `src/components/CookieBanner.tsx` | Banner de consentimento |
| `src/components/RouteTracker.tsx` | Evento a cada troca de rota |

A chave `cookie-consent` aparece em `index.html` e em `src/lib/analytics.ts`; mantenha as duas iguais.

## Como testar

- No console do navegador, `dataLayer` mostra os eventos e os comandos de consentimento.
- Para ver o banner de novo, apague a chave: `localStorage.removeItem('cookie-consent')` e recarregue.
- No GTM, use o modo **Visualizar**; no Google Ads, a conversão muda para "Registrando conversões"
  depois do primeiro clique real.

## Pendências

- **Política de Privacidade:** o banner ainda não linka para uma política, e a LGPD recomenda isso.
  O link no rodapé (`Footer.tsx`) está comentado.
- **Publicidade na advocacia:** o conteúdo dos anúncios deve respeitar o Provimento 205/2021 da OAB.
