import { ArrowRight } from 'lucide-react'
import type { Remedio } from '../../types/remedio'
import { BadgeVenda } from '../remedio/BadgeVenda'
import { BotaoFavorito } from '../remedio/BotaoFavorito'

interface RemedioCardProps {
  remedio: Remedio
  favorito: boolean
  onAlternarFavorito: () => void
  onVerBula: () => void
}

export function RemedioCard({ remedio, favorito, onAlternarFavorito, onVerBula }: RemedioCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-medium break-words text-ink">{remedio.nome}</h3>
          <p className="mt-0.5 text-xs text-muted">{remedio.subtitulo}</p>
        </div>
        <BotaoFavorito nome={remedio.nome} ativo={favorito} onClick={onAlternarFavorito} />
      </header>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <BadgeVenda tipoVenda={remedio.tipoVenda} tarja={remedio.tarja} />
        {import.meta.env.DEV && remedio.controle.status !== 'revisado' && (
          <span className="rounded-full border border-dashed border-amber-400 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-700">
            {remedio.controle.status}
          </span>
        )}
      </div>

      <dl className="mt-4 flex-1 space-y-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="text-[11px] font-medium uppercase text-accent">Para que serve</dt>
          <dd className="mt-0.5 text-ink-soft">{remedio.resumo.paraQueServe}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium uppercase text-accent">Posologia / Como tomar</dt>
          <dd className="mt-0.5 text-ink-soft">{remedio.resumo.comoTomar}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onVerBula}
        className="mt-5 flex w-fit items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
      >
        Ver Bula Simplificada
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </article>
  )
}
