import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import Home from '@/pages/Home'
import Vocabulary from '@/pages/Vocabulary'
import Verbs from '@/pages/Verbs'
import Conversation from '@/pages/Conversation'
import Pronunciation from '@/pages/Pronunciation'
import Video from '@/pages/Video'
import Writing from '@/pages/Writing'
import SentenceFrames from '@/pages/SentenceFrames'
import SoundVerbs from '@/pages/SoundVerbs'
import Notes from '@/pages/Notes'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/vocabulario" element={<Vocabulary />} />
        <Route path="/verbos" element={<Verbs />} />
        <Route path="/conversacao" element={<Conversation />} />
        <Route path="/pronuncia" element={<Pronunciation />} />
        <Route path="/videos" element={<Video />} />
        <Route path="/escrita" element={<Writing />} />
        <Route path="/estruturas" element={<SentenceFrames />} />
        <Route path="/verbos-som" element={<SoundVerbs />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
