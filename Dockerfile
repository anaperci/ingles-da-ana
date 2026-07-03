# ── build (Vite) ───────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# As VITE_* são baked no bundle. A anon key é PÚBLICA (protegida por RLS).
ARG VITE_SUPABASE_URL=https://ydnwqptkrftonunyjzoc.supabase.co
ARG VITE_SUPABASE_ANON_KEY=sb_publishable_r37qvgRp1kRznki_8xDC2A_5l7Cf9Lg
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
RUN npm run build

# ── serve (nginx) ──────────────────────────────────────────────
FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
