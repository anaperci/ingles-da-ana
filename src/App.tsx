import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { AppLayout } from '@/components/layout/AppLayout'

// Code-splitting por rota: cada página vira um chunk próprio, carregado só quando
// acessada. O JS inicial fica enxuto (a Home não puxa markdown, gravador, etc.).
const Home = lazy(() => import('@/pages/Home'))
const Vocabulary = lazy(() => import('@/pages/Vocabulary'))
const Verbs = lazy(() => import('@/pages/Verbs'))
const Conversation = lazy(() => import('@/pages/Conversation'))
const Pronunciation = lazy(() => import('@/pages/Pronunciation'))
const Video = lazy(() => import('@/pages/Video'))
const Writing = lazy(() => import('@/pages/Writing'))
const SentenceFrames = lazy(() => import('@/pages/SentenceFrames'))
const SoundVerbs = lazy(() => import('@/pages/SoundVerbs'))
const Pronouns = lazy(() => import('@/pages/Pronouns'))
const Grammar = lazy(() => import('@/pages/Grammar'))
const GrammarPacks = lazy(() => import('@/pages/GrammarPacks'))
const Exercises = lazy(() => import('@/pages/Exercises'))
const Prepositions = lazy(() => import('@/pages/Prepositions'))
const Adverbs = lazy(() => import('@/pages/Adverbs'))
const Planner = lazy(() => import('@/pages/Planner'))
const Deck = lazy(() => import('@/pages/Deck'))
const Notes = lazy(() => import('@/pages/Notes'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-24 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/vocabulario"
          element={
            <Suspense fallback={<PageFallback />}>
              <Vocabulary />
            </Suspense>
          }
        />
        <Route
          path="/verbos"
          element={
            <Suspense fallback={<PageFallback />}>
              <Verbs />
            </Suspense>
          }
        />
        <Route
          path="/conversacao"
          element={
            <Suspense fallback={<PageFallback />}>
              <Conversation />
            </Suspense>
          }
        />
        <Route
          path="/pronuncia"
          element={
            <Suspense fallback={<PageFallback />}>
              <Pronunciation />
            </Suspense>
          }
        />
        <Route
          path="/videos"
          element={
            <Suspense fallback={<PageFallback />}>
              <Video />
            </Suspense>
          }
        />
        <Route
          path="/escrita"
          element={
            <Suspense fallback={<PageFallback />}>
              <Writing />
            </Suspense>
          }
        />
        <Route
          path="/estruturas"
          element={
            <Suspense fallback={<PageFallback />}>
              <SentenceFrames />
            </Suspense>
          }
        />
        <Route
          path="/verbos-som"
          element={
            <Suspense fallback={<PageFallback />}>
              <SoundVerbs />
            </Suspense>
          }
        />
        <Route
          path="/pronomes"
          element={
            <Suspense fallback={<PageFallback />}>
              <Pronouns />
            </Suspense>
          }
        />
        <Route
          path="/gramatica"
          element={
            <Suspense fallback={<PageFallback />}>
              <Grammar />
            </Suspense>
          }
        />
        <Route
          path="/gramatica-real"
          element={
            <Suspense fallback={<PageFallback />}>
              <GrammarPacks />
            </Suspense>
          }
        />
        <Route
          path="/exercises"
          element={
            <Suspense fallback={<PageFallback />}>
              <Exercises />
            </Suspense>
          }
        />
        <Route
          path="/preposicoes"
          element={
            <Suspense fallback={<PageFallback />}>
              <Prepositions />
            </Suspense>
          }
        />
        <Route
          path="/adverbios"
          element={
            <Suspense fallback={<PageFallback />}>
              <Adverbs />
            </Suspense>
          }
        />
        <Route
          path="/planner"
          element={
            <Suspense fallback={<PageFallback />}>
              <Planner />
            </Suspense>
          }
        />
        <Route
          path="/deck/:key"
          element={
            <Suspense fallback={<PageFallback />}>
              <Deck />
            </Suspense>
          }
        />
        <Route
          path="/notes"
          element={
            <Suspense fallback={<PageFallback />}>
              <Notes />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
