import { ArrowRight, Check, Search, Sparkles } from 'lucide-react'
import { useState, type FormEvent } from 'react'

interface HeroProps {
  totalRemedios: number
  onBuscar: (termo: string) => void
}

export function Hero({ totalRemedios, onBuscar }: HeroProps) {
  const [termo, setTermo] = useState('')

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    onBuscar(termo)
  }

  const limpar = () => {
    setTermo('')
    onBuscar('')
  }

  return (
    <section id="inicio" className="scroll-mt-20 border-b border-line bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          <Sparkles className="size-3" aria-hidden />
          Informação clínica acessível
        </span>

        <h1 className="mt-6 text-4xl leading-tight font-normal tracking-tight text-ink sm:text-6xl">
          Busca Inteligente de Medicamentos
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Informações científicas, posologia e alertas sobre medicamentos de forma simples e rápida.
        </p>

        <form
          role="search"
          onSubmit={enviar}
          className="mt-8 flex items-center gap-2 rounded-2xl border border-line bg-white p-2 pl-4 shadow-sm focus-within:border-ink/40"
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
            placeholder="Digite o nome do remédio ou princípio ativo..."
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
          />
          {termo && (
            <button type="button" onClick={limpar} className="px-2 text-xs text-muted hover:text-ink">
              Limpar
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Buscar
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </form>

        <ul className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-medium text-ink-soft">
          <li className="flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1">
            <Sparkles className="size-3" aria-hidden />
            {totalRemedios} Medicamentos Cadastrados
          </li>
          <li className="flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1">
            <Check className="size-3" aria-hidden />
            Informações Verificadas
          </li>
        </ul>
      </div>
    </section>
  )
}
