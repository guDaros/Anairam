# Integração com o Instagram

A seção **Instagram** da página inicial mostra as últimas publicações do perfil
[@anairamadv](https://www.instagram.com/anairamadv/) de forma automática, sem que seja
necessário cadastrar links ou imagens manualmente.

## Como funciona

```
Instagram ──► Behold (serviço externo) ──► feed JSON público ──► site (navegador do visitante)
```

1. O perfil do Instagram está conectado a uma conta no [Behold](https://behold.so). O token de
   acesso ao Instagram fica guardado **no Behold**, que também cuida de renová-lo.
2. O Behold publica as últimas publicações numa URL pública em formato JSON.
3. O navegador do visitante busca essa URL (`fetch`) e o React monta a grade com o visual do
   site. Não existe backend próprio.

A URL do feed **não é um segredo**: ela só permite *ler* publicações que já são públicas. Ninguém
consegue postar, apagar ou acessar a conta do Instagram com ela.

## Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/constants.ts` | `INSTAGRAM_FEED_URL` (URL do feed), `INSTAGRAM` (link do perfil) e `INSTAGRAM_HANDLE` |
| `src/hooks/useInstagramPosts.ts` | Busca o feed com React Query e guarda o resultado por 30 minutos |
| `src/components/Instagram.tsx` | A seção: título, grade, estados de carregamento/erro e botão "Ver mais no Instagram" |
| `src/components/instagram/InstagramPostCard.tsx` | Cada publicação (imagem, ícone de vídeo/carrossel, link para o post) |
| `src/pages/Index.tsx` | Onde a seção é posicionada na página |

## Formato dos dados usados

Do JSON do Behold o site usa apenas o campo `posts`, e de cada publicação:

| Campo | Uso |
|---|---|
| `id` | chave do item na lista |
| `permalink` | link para o post no Instagram |
| `mediaType` | `IMAGE`, `VIDEO` ou `CAROUSEL_ALBUM`; define o ícone no canto da imagem |
| `prunedCaption` | legenda, usada (truncada) como texto alternativo da imagem |
| `sizes.medium.mediaUrl` | imagem quadrada de 700×700, servida pela CDN do Behold |

Usamos `sizes.medium.mediaUrl` (e não `mediaUrl`) porque as URLs da CDN do Instagram expiram, e as
do Behold não.

## Comportamento

- **Carregando:** seis quadrados cinza animados.
- **Erro ou feed vazio:** mensagem "Não foi possível carregar as publicações agora" e o botão do
  perfil continua visível. A página nunca quebra por causa do feed.
- **Cache:** enquanto o visitante navega, o resultado é reutilizado por 30 minutos
  (`staleTime` em `useInstagramPosts.ts`).
- **Layout:** 3 colunas no desktop e 2 no celular, com imagens carregadas sob demanda (`loading="lazy"`).

## Limites do plano grátis do Behold

Confira sempre em [behold.so/pricing](https://behold.so/pricing), pois podem mudar.

| Limite | Valor (na data da integração) |
|---|---|
| Posts por feed | 6 |
| Feeds / fontes | 1 |
| Visualizações por mês | 1.200 |
| Atualização do feed | 1 vez por dia |

Cada carregamento da página que inclui a seção conta como uma visualização. Se o limite do mês
estourar, o feed deixa de responder até virar o mês e o site mostra a mensagem de erro descrita
acima. O cache de 30 minutos reduz as buscas repetidas do mesmo visitante.

## Tarefas comuns

### Trocar o perfil ou o feed

1. No painel do Behold, crie ou abra o feed desejado e copie a URL do JSON
   (`https://feeds.behold.so/<id-do-feed>`).
2. Atualize `INSTAGRAM_FEED_URL` em `src/lib/constants.ts`.
3. Se o perfil mudou, atualize também `INSTAGRAM` e `INSTAGRAM_HANDLE`.

### Esconder uma publicação do site

O site mostra tudo o que o feed devolve. Para tirar um post, oculte ou apague a publicação no
próprio Instagram, ou filtre-a nas configurações do feed no painel do Behold. Não há lista de
exclusão no código.

### Mudar a quantidade de posts

A quantidade é definida no feed do Behold (máximo de 6 no plano grátis). O código exibe todos os
posts recebidos; em grade de 3 colunas, múltiplos de 3 ficam melhor.

### Restringir o uso do feed ao domínio do site

Como a URL é pública, qualquer pessoa que a copie pode gastar as visualizações mensais. Se o painel
do Behold oferecer a opção de domínios permitidos, cadastre `anairamsouza.adv.br`.

## Solução de problemas

| Sintoma | Causa provável |
|---|---|
| Aparece "Não foi possível carregar as publicações" | Limite mensal de visualizações atingido, URL do feed incorreta ou conta do Instagram desconectada no Behold |
| Posts novos não aparecem | O plano grátis atualiza o feed 1 vez por dia, e o site guarda o resultado por 30 minutos |
| Seção em branco com os quadrados cinza | A requisição está pendente ou bloqueada; veja a aba *Network* do navegador |
| Imagens não carregam | Verifique se `sizes.medium.mediaUrl` veio no JSON do feed (`curl <INSTAGRAM_FEED_URL>`) |

Para inspecionar o feed manualmente:

```sh
curl https://feeds.behold.so/<id-do-feed>
```

## Publicidade na advocacia

Como o feed é automático, tudo o que for publicado no perfil aparece no site. Mantenha o conteúdo
do Instagram em conformidade com o Provimento 205/2021 da OAB.

## Alternativas

Se os limites do plano grátis deixarem de atender:

- **Plano pago do Behold:** mais posts, mais visualizações e atualização mais frequente, sem mudar
  o código.
- **API oficial da Meta (Instagram API com login do Instagram):** sem limite de posts, mas exige um
  app no Meta for Developers, token que vence a cada 60 dias e uma função serverless para guardar o
  token e renová-lo. Só `useInstagramPosts.ts` precisaria mudar, para buscar o novo endpoint.
- **Cards manuais:** lista de imagens e links no código, sem serviço externo.
