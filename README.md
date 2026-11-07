# Site Anairam Souza Advocacia

Site institucional da advogada Anairam de Souza, com a página inicial e a página de links
(`/falecomigo`) usada na bio do Instagram.

## Tecnologias

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) e componentes [shadcn/ui](https://ui.shadcn.com)
- [React Router](https://reactrouter.com) e [TanStack Query](https://tanstack.com/query)
- Vitest e Testing Library para testes

## Como rodar

Requer Node.js 24 ou superior e npm.

```sh
npm install
npm run dev
```

O servidor de desenvolvimento abre em `http://localhost:8080`.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Roda o ESLint |
| `npm test` | Roda os testes uma vez |
| `npm run test:watch` | Roda os testes em modo observação |

## Estrutura

```
src/
  components/   seções da página (Hero2, Contato, FAQ, Instagram...)
    links/      componentes da página /falecomigo
    instagram/  componentes da seção do Instagram
    ui/         componentes base do shadcn/ui
  hooks/        hooks (animação de rolagem, feed do Instagram)
  lib/          constantes (contatos, OABs, links) e utilitários
  pages/        páginas: Index (/), FaleComigo (/falecomigo) e NotFound
  assets/       imagens
docs/           documentação das integrações
```

Dados de contato, números de OAB, links do WhatsApp e do Instagram ficam centralizados em
`src/lib/constants.ts`.

## Deploy

O `Dockerfile` faz o build do site e o serve com nginx na porta **81**, com fallback de SPA para o
React Router (`nginx.conf`).

```sh
docker build -t site-anairam .
docker run -p 81:81 site-anairam
```

## Documentação

- [Integração com o Instagram](docs/instagram.md): como a seção de publicações funciona,
  configuração, limites e solução de problemas.
