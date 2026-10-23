import { Heart, SearchX, X } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import type { Remedio } from '../../types/remedio'
import { FILTROS, correspondeBusca, type FiltroId } from '../../utils/remedio'
import { RemedioCard } from './RemedioCard'

interface CatalogoProps {
  remedios: Remedio[]
  busca: string
  onLimparBusca: () => void
  somenteFavoritos: boolean
  onSairDosFavoritos: () => void
  ehFavorito: (id: string) => boolean
  onAlternarFavorito: (id: string) => void
  onVerBula: (remedio: Remedio) => void
}

export function Catalogo({
  remedios,
  busca,
  onLimparBusca,
  somenteFavoritos,
  onSairDosFavoritos,
  ehFavorito,
  onAlternarFavorito,
  onVerBula,
}: CatalogoProps) {
  const [filtro, setFiltro] = useState<FiltroId>('todos')

  const visiveis = useMemo(() => {
    const aplica = FILTROS.find((f) => f.id === filtro)!.aplica
    return remedios.filter(
      (r) => aplica(r) && correspondeBusca(r, busca) && (!somenteFavoritos || ehFavorito(r.id)),
    )
  }, [remedios, filtro, busca, somenteFavoritos, ehFavorito])

  const total = visiveis.length

  return (
    <section id="catalogo" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-normal tracking-tight text-ink sm:text-4xl">Catálogo de Medicamentos</h2>
            <p className="mt-2 text-sm text-muted">Consulte informações essenciais de forma clara e responsável.</p>
          </div>
          <p className="text-xs text-muted" aria-live="polite">
            Exibindo {total} {total === 1 ? 'medicamento' : 'medicamentos'}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTROS.map((f) => {
            const ativo = f.id === filtro
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltro(f.id)}
                aria-pressed={ativo}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                  ativo ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-soft hover:border-ink/30'
                }`}
              >
                {f.label}
              </button>
            )
          })}

          {somenteFavoritos && (
            <FiltroRemovivel onRemover={onSairDosFavoritos} rotulo="Sair dos favoritos">
              <Heart className="size-3" fill="currentColor" aria-hidden />
              Favoritos
            </FiltroRemovivel>
          )}
          {busca && (
            <FiltroRemovivel onRemover={onLimparBusca} rotulo="Limpar busca">
              Busca: “{busca}”
            </FiltroRemovivel>
          )}
        </div>

        {total > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiveis.map((remedio) => (
              <RemedioCard
                key={remedio.id}
                remedio={remedio}
                favorito={ehFavorito(remedio.id)}
                onAlternarFavorito={() => onAlternarFavorito(remedio.id)}
                onVerBula={() => onVerBula(remedio)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
            <SearchX className="size-8 text-muted" aria-hidden />
            <p className="mt-4 font-medium text-ink">Nenhum medicamento encontrado</p>
            <p className="mt-1 text-sm text-muted">
              {somenteFavoritos
                ? 'Você ainda não favoritou nenhum medicamento com esses filtros.'
                : 'Tente outro nome, princípio ativo ou filtro.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

interface FiltroRemovivelProps {
  rotulo: string
  onRemover: () => void
  children: ReactNode
}

function FiltroRemovivel({ rotulo, onRemover, children }: FiltroRemovivelProps) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 py-1 pr-1 pl-3 text-xs font-medium text-accent">
      {children}
      <button
        type="button"
        onClick={onRemover}
        aria-label={rotulo}
        className="flex size-6 items-center justify-center rounded-full hover:bg-accent/15"
      >
        <X className="size-3" aria-hidden />
      </button>
    </span>
  )
}
