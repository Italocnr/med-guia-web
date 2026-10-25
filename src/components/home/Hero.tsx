import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useTotalVisitantes } from '../../hooks/useTotalVisitantes'
import type { Remedio } from '../../types/remedio'

interface HeroProps {
  totalRemedios: number
  destaques: Remedio[]
  onBuscar: (termo: string) => void
  onVerBula: (remedio: Remedio) => void
}

const formatarNumero = new Intl.NumberFormat('pt-BR').format

const NA_BULA = [
  { titulo: 'Indicações', texto: 'Para que o remédio serve e em quais situações costuma ser usado.' },
  { titulo: 'Contraindicações', texto: 'Quem não deve tomar e quando é preciso cuidado redobrado.' },
  { titulo: 'Efeitos colaterais', texto: 'O que pode acontecer e quais sinais pedem atendimento.' },
]

export function Hero({ totalRemedios, destaques, onBuscar, onVerBula }: HeroProps) {
  const [termo, setTermo] = useState('')
  const totalVisitantes = useTotalVisitantes()

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    onBuscar(termo)
  }

  return (
    <section id="inicio" className="scroll-mt-20 border-b border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <div>
          <p className="text-sm font-medium text-brand">Guia de medicamentos em linguagem simples</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-ink sm:text-5xl">
            Entenda o remédio antes de usar
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Informações dos medicamentos mais comuns no Brasil, reescritas a partir das bulas oficiais para
            qualquer pessoa conseguir ler.
          </p>

          <form
            role="search"
            onSubmit={enviar}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-lg border border-ink/20 bg-white p-1.5 pl-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15"
          >
            <Search className="size-4 shrink-0 text-muted" aria-hidden />
            <label htmlFor="busca" className="sr-only">
              Nome do remédio ou princípio ativo
            </label>
            <input
              id="busca"
              type="search"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Nome do remédio ou princípio ativo"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Buscar
            </button>
          </form>

          {destaques.length > 0 && (
            <div className="mt-4 flex max-w-xl flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
              <span className="text-muted">Mais procurados:</span>
              {destaques.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onVerBula(r)}
                  className="text-ink underline decoration-line underline-offset-4 hover:text-brand hover:decoration-brand"
                >
                  {r.nome}
                </button>
              ))}
            </div>
          )}

          <p className="mt-10 text-sm text-muted">
            <strong className="font-semibold text-ink">{formatarNumero(totalRemedios)}</strong> medicamentos no
            catálogo
            {totalVisitantes !== null && (
              <>
                {' · '}
                <strong className="font-semibold text-ink">{formatarNumero(totalVisitantes)}</strong>{' '}
                {totalVisitantes === 1 ? 'pessoa já usou' : 'pessoas já usaram'} o MedGuia
              </>
            )}
          </p>
        </div>

        <aside className="self-start rounded-lg border border-line bg-surface p-6">
          <h2 className="font-serif text-lg font-semibold text-ink">O que você encontra em cada bula</h2>
          <ol className="mt-4 space-y-4">
            {NA_BULA.map((item, i) => (
              <li key={item.titulo} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white text-xs font-semibold text-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.titulo}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft">
            <strong className="font-semibold">Aqui não tem dose nem modo de usar.</strong> Quanto e como tomar
            depende de cada pessoa e deve ser orientado pelo médico ou farmacêutico.
          </p>
        </aside>
      </div>
    </section>
  )
}
