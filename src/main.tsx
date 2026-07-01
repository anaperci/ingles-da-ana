import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { AuthGate } from '@/components/auth/AuthGate'

// Multiusuário: o AuthGate exige login, prepara o cache do usuário, puxa a nuvem
// e liga o autosave antes de montar o app.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthGate>
        <App />
      </AuthGate>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  </StrictMode>
)
