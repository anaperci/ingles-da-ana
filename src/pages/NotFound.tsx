import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="text-6xl font-extrabold text-primary">404</div>
      <p className="mt-2 text-lg text-muted-foreground">Página não encontrada.</p>
      <Button asChild className="mt-6">
        <Link to="/">Voltar para o início</Link>
      </Button>
    </div>
  )
}
