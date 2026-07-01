# PRD — English with Ana

> Documento de requisitos de produto refletindo o **estado atual** do sistema.
> Última atualização: 01/07/2026.

---

## 1. Visão geral

**English with Ana** é uma plataforma web de estudo de inglês, criada originalmente como app pessoal da Ana (preparação para morar em **Malta**) e agora **multiusuário**. Reúne, num só lugar, prática guiada por IA (conversação, correção de escrita, avaliação de pronúncia), vocabulário com repetição espaçada, e um **planner anual de 52 semanas** importado de um curso, tudo integrado aos módulos do próprio app.

- **Produção:** https://ingles-da-ana.vercel.app
- **Repositório:** github.com/anaperci/ingles-da-ana (privado)
- **Status:** no ar, em uso real, todas as integrações externas ativas.

### Objetivo do produto
Concentrar o estudo diário de inglês num fluxo único: seguir o planner do curso, e cada tarefa é executada dentro do app (falar, escrever, ouvir, revisar vocabulário) com feedback imediato e correção que **ensina o jeito certo**, não só aponta o erro.

---

## 2. Público-alvo

- **Primário:** a Ana — nível intermediário, foco em conversação e pronúncia para o dia a dia em Malta.
- **Agora também:** outros usuários (o sistema virou multiusuário com login e dados isolados por conta).

---

## 3. Stack técnica

| Camada | Tecnologia |
|---|---|
| Frontend | Vite 8 + React 19 + TypeScript + Tailwind v3 |
| UI | Componentes shadcn escritos à mão + Radix primitives + lucide-react |
| Roteamento | React Router (lazy/code-splitting por rota) |
| Markdown | react-markdown + remark-gfm + @tailwindcss/typography |
| Toasts | sonner |
| Auth | Supabase Auth (email/senha) |
| Backend | Supabase Edge Functions (Deno) — projeto único `ydnwqptkrftonunyjzoc`, schema `ingles` |
| IA de texto | OpenAI `gpt-4o-mini` |
| Fala (nota + voz) | Azure Speech (Pronunciation Assessment + Neural TTS) |
| Vídeo | YouTube Data API v3 |
| Deploy | Vercel (frontend) + Supabase (functions) |

### Princípio de arquitetura
As **chaves de API nunca ficam no frontend** — vivem como secrets nas Edge Functions, que atuam como proxies seguros. O frontend só tem a `anon key` do Supabase (auth + chamada das functions).

---

## 4. Autenticação e multiusuário

- **Login/cadastro** por email e senha (`AuthGate` + `AuthScreen`). Sem sessão → tela de login; com sessão → app.
- **Conta ativa = id do usuário** (`src/lib/account.ts`). Progresso e notas são isolados por conta.
- **Cache local por usuário:** o localStorage é o cache do usuário logado. No 1º login os dados existentes são **adotados** (não se perdem); ao trocar de usuário, o cache é limpo e recarregado da nuvem.
- **Sair** no rodapé do menu (mostra o email logado).
- Confirmação de email é configurável no painel Supabase.
- *Limitação de segurança atual:* as functions confiam no `accountId` (UUID) enviado pelo cliente — adequado para poucos usuários; endurecer com verificação de JWT no servidor se abrir para escala pública.

---

## 5. Módulos (features)

### 5.1 Home (`/`)
Dashboard com: saudação, meta do dia, **cartões de tarefa** (escrita, conversação, pronúncia, reforço de pronomes), **card do Planner** (progresso + próximo dia), **card grande de pontos de escrita**, "This week" (streak), "Your records", e o "Verbo do dia".

### 5.2 Planner (`/planner`) — coração do produto
- **Cronograma dos Fluentes**, 52 semanas / **360 dias**, extraído do PDF do curso.
- Cada dia = **assistir à aula N + fazer o quiz N + atividade extra** (checkboxes por tarefa).
- Progresso persistido por usuário, % geral, destaque de semana/dia atual.
- **Vocabulário da semana:** cada semana aponta para um deck temático.
- **Atividades ligadas ao app:** botões "fazer no app" que abrem o módulo certo (Pronúncia, Conversar, Escrever, Vídeo, Vocabulário) — inclusive a **Conversação já abre no tema da atividade** (deep-link com contexto).

### 5.3 Vocabulário (`/vocabulario`)
- Palavras essenciais por seção, com **repetição espaçada SM-2** (flashcard + quiz).
- **Quiz corrige de verdade:** ao errar, mostra a tradução certa + exemplo e botão "Continuar".
- **Decks temáticos** (12 temas: comida, casa, viagem, família, trabalho, saúde, roupas, rotina, sentimentos, natureza, compras, apresentações) — estudo em flashcard com áudio.

### 5.4 Deck temático (`/deck/:key`)
Flashcard com flip (inglês → tradução + frase de exemplo) e **áudio** dos dois lados.

### 5.5 Verbos (`/verbos`)
- **Irregulares:** 3 modos — flashcard, preencher e cronometrado — com correção (conjugação certa + exemplo + dica).
- **Phrasal verbs:** significado e completar, com correção (resposta + significado + exemplo).

### 5.6 Verb sounds / Verbos por som (`/verbos-som`)
Ler, falar e escrever focando na sonoridade (base → passado), com correção padronizada.

### 5.7 Pronomes (`/pronomes`)
Reforço de pronomes: 25 exercícios (sujeito, objeto, possessivos, reflexivos) com correção explicada e **tabela de referência**.

### 5.8 Escrita (`/escrita`)
- **30 frases/dia** com palavras-alvo. Pode deixar em branco / marcar "não sei" e finalizar a qualquer hora.
- **IA avalia** (OpenAI, JSON mode): mostra a **forma certa** sempre + explicação do erro + **regra prática**.
- **Fila de revisão SM-2:** palavra errada volta noutro dia, em frase nova, até dominar.
- **Pontuação acumulada:** pontos por dia (escrita, acerto, revisão dominada, bônus), **níveis** (Starter → Master) e **streak**.
- Parser tolerante a JSON truncado (nunca perde as correções).

### 5.9 Sentence frames / Estruturas (`/estruturas`)
Estruturas de frase para ler, falar (com nota do Azure) e escrever.

### 5.10 Conversação (`/conversacao`)
- Chat com **tutor de IA** (OpenAI) em cenários reais de Malta; corrige inline (dica com 💡).
- Aceita **deep-link `?topic=`**: abre já praticando a atividade do dia vinda do Planner.

### 5.11 Pronúncia (`/pronuncia`)
- Grava a voz → **Azure Speech Pronunciation Assessment** → nota por palavra (geral, precisão, fluência, completude) e destaque colorido dos erros.
- Funciona em qualquer navegador (não depende mais do reconhecimento nativo).

### 5.12 Vídeos (`/videos`)
- **Vídeo do dia** via YouTube Data API, cacheado por dia, com fallback curado.
- Atualmente restrito ao canal **Matheus Werner Jerke**, focado em **conversação** (configurável na function).

### 5.13 Notas (`/notes`)
- Estilo Evernote: título, conteúdo, tag, data. **Markdown** com toolbar (negrito, itálico, listas, título) + pré-visualização.
- **UI otimista + cache:** cria/edita/apaga na hora; sincroniza com o servidor em segundo plano.
- Busca em tempo real, rascunho auto-salvo, deletar com confirmação.

---

## 6. Recursos transversais

- **Correção padronizada** (`CorrectionCard`): ✓/✗ + forma certa + exemplo (en/pt) + dica + áudio, usada em Escrita, Verbos, Phrasal, Quiz de vocabulário e Sound Verbs.
- **Repetição espaçada (SM-2):** motor único reutilizado por vocabulário, verbos e fila de revisão da escrita.
- **Áudio natural (Azure Neural TTS):** botões "ouvir" com voz neural (`en-GB-SoniaNeural`), com cache e fallback pra voz do navegador.
- **Progresso unificado:** streak, dias ativos, minutos, notas médias, palavras/verbos dominados.

---

## 7. Backend — Edge Functions

| Function | Papel | Serviço |
|---|---|---|
| `chat` | Conversação, tutor lateral e avaliação da escrita (JSON mode) | OpenAI gpt-4o-mini |
| `pronounce` | Nota de pronúncia por palavra | Azure Speech Assessment |
| `tts` | Áudio natural dos "ouvir" | Azure Neural TTS |
| `progress` | Sync do snapshot de progresso por usuário | Postgres (`ingles.progress`) |
| `notes` | CRUD das notas | Postgres (`ingles.notes`) |
| `daily-video` | Vídeo do dia | YouTube Data API v3 |

- Functions de dados conectam **direto no Postgres** (`SUPABASE_DB_URL`, postgres.js) — o schema `ingles` não é exposto ao PostgREST. Conexão reaproveitada entre invocações.
- Secrets: `OPENAI_API_KEY`, `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`, `YOUTUBE_API_KEY`.
- Functions de Azure são **à prova de troca** de chave/região (detectam qual valor é chave vs região; default `eastus`).

---

## 8. Dados e persistência

- **localStorage** (prefixo `ingles-da-ana:`) é o estado primário/cache — leitura síncrona, app abre instantâneo.
- **Sync na nuvem:** um snapshot JSON por conta em `ingles.progress` (last-writer-wins por timestamp). Pull no login (2º plano), push com debounce a cada mudança.
- **Notas:** tabela `ingles.notes` (RLS habilitado, acesso só via function). Cache local + UI otimista.
- **Tabelas** (schema `ingles`): `progress` (snapshot por conta), `notes`.

---

## 9. Design

- **Paleta:** Petróleo `#1C3E4A` (destaque/texto forte) + Âmbar `#F2A24E` (ação; texto sobre âmbar é petróleo) + Creme `#FCE8D5` (cards suaves) sobre **branco**. **Light-only**.
- **Tipografia:** Inter / Inter Tight + JetBrains Mono.
- **Layout:** 3 colunas (Sidebar | Main | Rail) no desktop, drawer no mobile. Cards brancos, borda fina, radius ~16px.
- **Idioma:** interface e menu em inglês; conteúdo de ensino bilíngue (PT/EN).

---

## 10. Performance

- **Boot instantâneo:** renderiza com o estado local e sincroniza a nuvem em 2º plano.
- **Code-splitting por rota:** JS inicial enxuto; dados pesados (planner, markdown) só carregam quando acessados.
- **Notas otimistas + cache:** sem espera perceptível apesar da latência edge→banco.
- **Áudio TTS com cache** por texto (repetir é instantâneo).

---

## 11. Limitações conhecidas / próximos passos

- **Segurança das functions:** confiam no `accountId` do cliente — adicionar verificação de JWT se abrir para o público.
- **Aula/Quiz do Planner:** são checkboxes (o conteúdo vive na plataforma do curso, fora do app).
- **Semana 52 do Planner:** parcial (3 dias); um dia teve leve junção de texto na extração do PDF.
- **Cota das APIs externas:** YouTube (10k un./dia), Azure e OpenAI têm limites/custo — hoje sob controle no uso de 1 usuário.
- **Ideias em aberto:** decks temáticos na fila de revisão SM-2; escolha de voz do TTS pela usuária; migração do progresso antigo (`ana`) para contas novas em outros dispositivos.

---

## 12. Histórico resumido de evolução

Reconstruído do zero a partir do PRD original (era business-only) → repositionado para uso real (Malta) → backend OpenAI + Azure + YouTube → correções que ensinam em todos os módulos → planner do curso integrado com deep-links → decks temáticos → multiusuário → áudio com voz neural.
