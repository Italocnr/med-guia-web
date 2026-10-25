import { Heart, RotateCcw, Search, SearchX, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Categoria, Remedio } from '../../types/remedio'
import { CATEGORIAS, FILTROS_VENDA, correspondeBusca, type FiltroVenda } from '../../utils/remedio'
import { RemedioCard } from './RemedioCard'

interface CatalogoProps {
  remedios: Remedio[]
  busca: string
  onBuscaChange: (termo: string) => void
  somenteFavoritos: boolean
  onSairDosFavoritos: () => void
  ehFavorito: (id: string) => boolean
  onAlternarFavorito: (id: string) => void
  onVerBula: (remedio: Remedio) => void
}

export function Catalogo({
  remedios,
  busca,
  onBuscaChange,
  somenteFavoritos,
  onSairDosFavoritos,
  ehFavorito,
  onAlternarFavorito,
  onVerBula,
}: CatalogoProps) {
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [venda, setVenda] = useState<FiltroVenda>('todos')

  // Tudo menos a categoria: é sobre esta lista que os chips contam quantos itens cada categoria teria.
  const semCategoria = useMemo(
    () =>
      remedios.filter(
        (r) =>
          (venda === 'todos' || r.tipoVenda === venda) &&
          correspondeBusca(r, busca) &&
          (!somenteFavoritos || ehFavorito(r.id)),
      ),
    [remedios, venda, busca, somenteFavoritos, ehFavorito],
  )

  const visiveis = categoria ? semCategoria.filter((r) => r.categoria === categoria) : semCategoria
  const total = visiveis.length

  const contagem = (id: Categoria) => semCategoria.filter((r) => r.categoria === id).length
  // Só mostra categorias que existem no catálogo, para não exibir chips sempre vazios.
  const categorias = CATEGORIAS.filter((c) => remedios.some((r) => r.categoria === c.id))

  const temFiltro = Boolean(categoria || venda !== 'todos' || busca || somenteFavoritos)
  const limparFiltros = () => {
    setCategoria(null)
    setVenda('todos')
    onBuscaChange('')
    onSairDosFavoritos()
  }

  return (
    <section id="catalogo" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Catálogo de medicamentos</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">Filtre por categoria ou tipo de venda e abra a bula simplificada de cada remédio.</p>
        </div>

        <div className="mt-8 rounded-lg border border-line bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-surface px-3 focus-within:border-brand focus-within:bg-white">
              <Search className="size-4 shrink-0 text-muted" aria-hidden />
              <label htmlFor="busca-catalogo" className="sr-only">
                Filtrar por nome ou princípio ativo
              </label>
              <input
                id="busca-catalogo"
                type="search"
                value={busca}
                onChange={(e) => onBuscaChange(e.target.value)}
                placeholder="Filtrar por nome ou princípio ativo"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
              />
              {busca && (
                <button
                  type="button"
                  onClick={() => onBuscaChange('')}
                  aria-label="Limpar busca"
                  className="flex size-6 items-center justify-center rounded-full text-muted hover:bg-line hover:text-ink"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              )}
            </div>

            <div role="group" aria-label="Tipo de venda" className="flex rounded-md bg-surface p-1">
              {FILTROS_VENDA.map((f) => {
                const ativo = f.id === venda
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setVenda(f.id)}
                    aria-pressed={ativo}
                    className={`flex-1 rounded px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors md:flex-none ${
                      ativo ? 'bg-white text-ink shadow-sm ring-1 ring-line' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div
            role="group"
            aria-label="Categoria"
            className="-mx-4 mt-4 flex gap-2 overflow-x-auto border-t border-line px-4 pt-4 pb-1 sm:-mx-5 sm:px-5 md:flex-wrap md:overflow-visible"
          >
            <ChipCategoria rotulo="Todas" quantidade={semCategoria.length} ativo={!categoria} onClick={() => setCategoria(null)} />
            {categorias.map((c) => (
              <ChipCategoria
                key={c.id}
                rotulo={c.label}
                quantidade={contagem(c.id)}
                ativo={categoria === c.id}
                onClick={() => setCategoria(categoria === c.id ? null : c.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm text-muted" aria-live="polite">
              <span className="font-semibold text-ink">{total}</span> {total === 1 ? 'medicamento' : 'medicamentos'}
            </p>
            {somenteFavoritos && (
              <span className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 py-1 pr-1 pl-3 text-xs font-medium text-rose-600">
                <Heart className="size-3" fill="currentColor" aria-hidden />
                Só favoritos
                <button
                  type="button"
                  onClick={onSairDosFavoritos}
                  aria-label="Sair dos favoritos"
                  className="flex size-6 items-center justify-center rounded-full hover:bg-rose-100"
                >
                  <X className="size-3" aria-hidden />
                </button>
              </span>
            )}
          </div>
          {temFiltro && (
            <button
              type="button"
              onClick={limparFiltros}
              className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Limpar filtros
            </button>
          )}
        </div>

        {total > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-4 flex flex-col items-center rounded-lg border border-dashed border-line bg-white px-6 py-16 text-center">
            <SearchX className="size-8 text-muted" aria-hidden />
            <p className="mt-4 font-medium text-ink">Nenhum medicamento encontrado</p>
            <p className="mt-1 text-sm text-muted">
              {somenteFavoritos
                ? 'Você ainda não favoritou nenhum medicamento com esses filtros.'
                : 'Tente outro nome, princípio ativo ou filtro.'}
            </p>
            <button
              type="button"
              onClick={limparFiltros}
              className="mt-5 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-surface"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

interface ChipCategoriaProps {
  rotulo: string
  quantidade: number
  ativo: boolean
  onClick: () => void
}

function ChipCategoria({ rotulo, quantidade, ativo, onClick }: ChipCategoriaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`flex shrink-0 items-center gap-2 rounded-md border py-1.5 pr-1.5 pl-3 text-xs font-medium transition-colors ${
        ativo ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-soft hover:border-ink/30'
      } ${quantidade === 0 && !ativo ? 'opacity-50' : ''}`}
    >
      {rotulo}
      <span
        className={`flex min-w-6 items-center justify-center rounded px-1.5 py-0.5 text-[11px] font-semibold ${
          ativo ? 'bg-white/20 text-white' : 'bg-surface text-muted'
        }`}
      >
        {quantidade}
      </span>
    </button>
  )
}
