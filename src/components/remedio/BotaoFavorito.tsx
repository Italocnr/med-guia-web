import { Heart } from 'lucide-react'

interface BotaoFavoritoProps {
  nome: string
  ativo: boolean
  onClick: () => void
  tamanho?: 'sm' | 'md'
}

export function BotaoFavorito({ nome, ativo, onClick, tamanho = 'sm' }: BotaoFavoritoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      aria-label={ativo ? `Remover ${nome} dos favoritos` : `Adicionar ${nome} aos favoritos`}
      className={`flex shrink-0 items-center justify-center rounded-full border transition-colors ${
        tamanho === 'md' ? 'size-11' : 'size-9'
      } ${ativo ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-line bg-white text-ink hover:bg-surface'}`}
    >
      <Heart className="size-4" fill={ativo ? 'currentColor' : 'none'} aria-hidden />
    </button>
  )
}
