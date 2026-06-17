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

// Renderiza JÁ com o estado local (abertura instantânea) e puxa a nuvem em
// segundo plano: se vier mais nova, os stores se atualizam sozinhos via evento.
// O autosave só liga DEPOIS do pull, pra não empurrar local velho sobre nuvem nova.
render()
loadCloudIntoLocal().finally(() => {
  startCloudAutosave()
})
