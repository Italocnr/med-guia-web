import { ArrowUpRight } from 'lucide-react'
import { artigos } from '../../data/artigos'

const BULARIO = 'https://consultas.anvisa.gov.br/#/bulario/'

export function Artigos() {
  return (
    <section id="artigos" className="scroll-mt-20 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[18rem_1fr] lg:gap-16">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Para ler mais</h2>
          <p className="mt-2 text-ink-soft">Materiais de instituições de saúde que serviram de base para o projeto.</p>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            A bula completa e oficial de qualquer remédio registrado no Brasil está no{' '}
            <a href={BULARIO} target="_blank" rel="noreferrer" className="text-brand underline underline-offset-2">
              Bulário Eletrônico da Anvisa
            </a>
            .
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {artigos.map(({ id, titulo, resumo, fonte, url }) => (
            <li key={id}>
              <a href={url} target="_blank" rel="noreferrer" className="group flex gap-6 py-6">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium tracking-wide text-muted uppercase">{fonte}</p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-ink group-hover:text-brand">{titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{resumo}</p>
                </div>
                <ArrowUpRight
                  className="mt-6 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                  aria-hidden
                />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
