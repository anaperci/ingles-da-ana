import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { loadCloudIntoLocal, startCloudAutosave } from '@/lib/cloudSync'

function render() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
        <Toaster richColors position="top-center" />
      </BrowserRouter>
    </StrictMode>
  )
}

// Puxa o progresso da nuvem (se mais recente) antes de montar a UI, depois liga
// o autosave. Falhas são silenciosas — o app sempre abre com o estado local.
loadCloudIntoLocal().finally(() => {
  render()
  startCloudAutosave()
})
