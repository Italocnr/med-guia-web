import { ArrowRight } from 'lucide-react'
import type { Remedio, Tarja } from '../../types/remedio'
import { normalizar } from '../../utils/remedio'
import { BadgeVenda } from '../remedio/BadgeVenda'
import { BotaoFavorito } from '../remedio/BotaoFavorito'

// Faixa no topo do card na cor da tarja, como na caixa do remédio.
const FAIXA_TARJA: Record<Tarja, string> = {
  sem_tarja: 'bg-transparent',
  vermelha: 'bg-red-600',
  vermelha_retencao: 'bg-red-600',
  preta: 'bg-ink',
}

interface RemedioCardProps {
  remedio: Remedio
  favorito: boolean
  onAlternarFavorito: () => void
  onVerBula: () => void
}

export function RemedioCard({ remedio, favorito, onAlternarFavorito, onVerBula }: RemedioCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-ink/25">
      <div className={`h-1.5 ${FAIXA_TARJA[remedio.tarja]}`} aria-hidden />

      <div className="flex flex-1 flex-col p-5">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-xl font-semibold break-words text-ink">{remedio.nome}</h3>
            <p className="mt-0.5 text-sm text-muted">{remedio.subtitulo}</p>
          </div>
          <BotaoFavorito nome={remedio.nome} ativo={favorito} onClick={onAlternarFavorito} />
        </header>

        <div className="mt-3">
          <BadgeVenda tipoVenda={remedio.tipoVenda} tarja={remedio.tarja} tom="colorido" />
        </div>

        <dl className="mt-4 flex-1 space-y-3 text-sm">
          <div>
            <dt className="text-xs font-semibold text-ink">Para que serve</dt>
            <dd className="mt-0.5 leading-relaxed text-ink-soft">{remedio.resumo.paraQueServe}</dd>
          </div>
          {/* Em genéricos o princípio ativo repete o nome; só vale mostrar nos de marca. */}
          {normalizar(remedio.principioAtivo) !== normalizar(remedio.nome) && (
            <div>
              <dt className="text-xs font-semibold text-ink">Princípio ativo</dt>
              <dd className="mt-0.5 leading-relaxed text-ink-soft">{remedio.principioAtivo}</dd>
            </div>
          )}
        </dl>
      </div>

      <button
        type="button"
        onClick={onVerBula}
        className="flex items-center justify-between border-t border-line px-5 py-3.5 text-left text-sm font-semibold text-brand transition-colors hover:bg-surface"
      >
        Ler bula simplificada
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </article>
  )
}
