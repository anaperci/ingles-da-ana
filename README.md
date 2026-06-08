# Inglês da Ana 🇬🇧

Plataforma pessoal de treino de inglês com IA — **vocabulário**, **conversação**, **pronúncia** e **vídeo do dia**. Feita para revisar e destravar a fala antes do intercâmbio em Malta.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS + shadcn/ui** (tema roxo, menu superior, light)
- **Supabase Edge Functions** como proxy seguro das APIs (Claude, Azure, YouTube)
- **Recharts**, **lucide-react**, **sonner**
- Deploy: **Vercel** · Persistência local: **localStorage** (sync via Supabase opcional)

## Módulos

| Módulo | O que faz | Precisa de chave? |
|---|---|---|
| Vocabulário | Flashcards + quiz + repetição espaçada (SM-2) | Não (funciona offline) |
| Conversação | Chat por cenários reais, correções da IA | Sim — `ANTHROPIC_API_KEY` |
| Pronúncia | Grava a fala e avalia por palavra/fonema | Sim — `AZURE_SPEECH_KEY` |
| Vídeo do dia | Sugestão diária por interesse | Sim — `YOUTUBE_API_KEY` (tem fallback curado) |

> Sem as chaves, o app roda em **modo demonstração**: vocabulário 100% funcional e os demais mostram aviso amigável.

## Rodar local

```bash
npm install
cp .env.example .env   # preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
npm run dev
```

## Backend (Supabase Edge Functions)

As chaves secretas **nunca** ficam no frontend — vivem como secrets nas functions.

```bash
# 1) Banco: rode supabase/migrations/0001_init.sql no SQL Editor (schema ingles)

# 2) Secrets
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set AZURE_SPEECH_KEY=...  AZURE_SPEECH_REGION=westeurope
supabase secrets set YOUTUBE_API_KEY=...

# 3) Deploy das functions
supabase functions deploy chat
supabase functions deploy pronounce
supabase functions deploy daily-video
```

## Deploy (Vercel)

1. Conectar o repositório no Vercel (framework: **Vite**).
2. Definir env vars `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
3. `vercel.json` já cuida do roteamento SPA.

## Arquitetura de pastas (padrão reutilizável)

```
src/
  components/<modulo>/   componentes de UI do módulo
  data/<modulo>.ts       dados-semente (fácil de expandir)
  hooks/                 useSrsDeck (SM-2 genérico), useProgress, ...
  lib/                   srs, storage, api, audio, tts, utils
  pages/                 uma página por rota
  types/                 tipos compartilhados + por módulo
```

Novos módulos de estudo (ex.: **Verbos**) reutilizam `useSrsDeck` (SM-2) e a
camada de persistência — mesma organização, sem inventar arquitetura nova.
