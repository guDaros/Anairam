# ---------- Stage 1: build ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Copia lockfiles primeiro pra cache
    COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
    
    # Instala deps
    RUN \
      if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
      elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
      else npm ci; \
      fi
    
    # Copia o resto e builda
    COPY . .
    
    RUN \
      if [ -f yarn.lock ]; then yarn build; \
      elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm build; \
      else npm run build; \
      fi
    
    # ---------- Stage 2: nginx ----------
    FROM nginx:1.27-alpine
    WORKDIR /usr/share/nginx/html
    
    # Limpa html padrão
    RUN rm -rf ./*
    
    # Copia o build do Vite (dist)
    COPY --from=build /app/dist ./
    
    # Se for Create React App, comente a linha acima e use:
    # COPY --from=build /app/build ./
    
    # Config do nginx com SPA fallback
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    