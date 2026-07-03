# Deploy no VPS — ingles.anapaulaperci.com.br

App = SPA estático (Vite) servido por nginx num container Docker. O backend
continua no Supabase (Edge Functions), nada muda lá.

## Pré-requisitos
- VPS Hostinger com Docker + docker compose + nginx (host) — já tem (mesmo do Sentinela).
- DNS: registro **A** de `ingles.anapaulaperci.com.br` → IP do VPS.
  Confirme: `dig ingles.anapaulaperci.com.br +short` deve retornar o IP.

---

## Passo a passo (rodar no VPS)

### 1. Clonar o repositório (PRIVADO — precisa de token)
O repo é privado, então o `git clone` pede autenticação. Crie um **Personal
Access Token** no GitHub (Settings → Developer settings → Tokens → escopo `repo`)
e use assim (rode UMA linha por vez, não cole tudo junto):
```bash
mkdir -p /opt/apps && cd /opt/apps
git clone https://SEU_TOKEN@github.com/anaperci/ingles-da-ana.git
cd ingles-da-ana
```
(Nas próximas vezes, só `git pull` pra atualizar.)

> Alternativa sem GitHub no VPS: no seu Mac rode `npm run build` e
> `rsync -avz --delete dist/ root@IP:/opt/apps/ingles-html/`, e sirva essa pasta
> pelo nginx (veja o fim deste arquivo).

### 2. Subir o container (build + run)
```bash
docker compose up -d --build
```
Isso builda o app e sobe na porta **3005** do VPS. Testa:
```bash
curl -I http://127.0.0.1:3005   # deve responder 200
```
Se a 3005 estiver ocupada, edite `docker-compose.yml` (ex: `3006:80`) e o
`deploy/nginx-host.conf` na mesma porta.

### 3. Reverse proxy no nginx do host
```bash
cp deploy/nginx-host.conf /etc/nginx/sites-available/ingles
ln -sf /etc/nginx/sites-available/ingles /etc/nginx/sites-enabled/ingles
nginx -t && systemctl reload nginx
```
(Se seu nginx usa `/etc/nginx/conf.d/`, copie pra lá como `ingles.conf`.)

### 4. SSL (HTTPS)
```bash
certbot --nginx -d ingles.anapaulaperci.com.br
```

Pronto → https://ingles.anapaulaperci.com.br

---

## Atualizar depois (redeploy)
```bash
cd /opt/apps/ingles-da-ana
git pull
docker compose up -d --build
```

---

## Alternativa rápida (sem Docker, build no seu Mac)
Se preferir buildar local e só enviar os arquivos:
```bash
# no seu Mac, na pasta do projeto:
npm run build
rsync -avz --delete dist/ root@SEU_IP:/var/www/ingles/
```
E no VPS, um server block nginx apontando `root /var/www/ingles;` com
`try_files $uri $uri/ /index.html;` + certbot.
