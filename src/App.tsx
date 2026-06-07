import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import Home from '@/pages/Home'
import Vocabulary from '@/pages/Vocabulary'
import Conversation from '@/pages/Conversation'
import Pronunciation from '@/pages/Pronunciation'
import Video from '@/pages/Video'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/vocabulario" element={<Vocabulary />} />
        <Route path="/conversacao" element={<Conversation />} />
        <Route path="/pronuncia" element={<Pronunciation />} />
        <Route path="/videos" element={<Video />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
