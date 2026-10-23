import { ArrowRight } from 'lucide-react'
import { artigos } from '../../data/artigos'

export function Artigos() {
  return (
    <section id="artigos" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-3xl font-normal tracking-tight text-ink sm:text-4xl">Artigos e Informações de Saúde</h2>
        <p className="mt-2 text-sm text-muted">Conteúdo educativo para escolhas mais conscientes.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artigos.map(({ id, titulo, resumo, minutosLeitura, icone: Icone, capa }) => (
            <article
              key={id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${capa}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_55%)]" />
                <Icone
                  className="relative size-16 text-white/90 drop-shadow-lg transition-transform group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[10px] font-medium uppercase text-ink-soft">{minutosLeitura} min de leitura</p>
                <h3 className="mt-1 text-lg text-ink">{titulo}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{resumo}</p>
                {/* Os artigos ainda não têm página própria. */}
                <a href="#artigos" className="mt-3 flex w-fit items-center gap-1 text-xs text-ink hover:text-accent">
                  Ler artigo <ArrowRight className="size-3" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
