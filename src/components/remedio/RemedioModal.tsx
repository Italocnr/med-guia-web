import { AlertTriangle, ArrowRight, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { AbaId, Remedio } from '../../types/remedio'
import { ABAS } from '../../utils/remedio'
import { BadgeVenda } from './BadgeVenda'
import { BotaoFavorito } from './BotaoFavorito'

const COLUNAS_INFOS = ['', 'sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3']

interface RemedioModalProps {
  remedio: Remedio
  favorito: boolean
  onAlternarFavorito: () => void
  onFechar: () => void
}

export function RemedioModal({ remedio, favorito, onAlternarFavorito, onFechar }: RemedioModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const abasRef = useRef<(HTMLButtonElement | null)[]>([])
  const [abaAtiva, setAbaAtiva] = useState<AbaId>('indicacoes')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Sem dialog.close() aqui: o evento "close" chamaria onFechar no remount do StrictMode.
    return () => {
      document.body.style.overflow = overflowAnterior
    }
  }, [])

  // Setas esquerda/direita navegam entre as abas (padrão WAI-ARIA de tabs).
  const navegarAbas = (e: KeyboardEvent, indice: number) => {
    const passo = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!passo) return
    const proximo = (indice + passo + ABAS.length) % ABAS.length
    setAbaAtiva(ABAS[proximo].id)
    abasRef.current[proximo]?.focus()
  }

  const aba = remedio.abas[abaAtiva]
  const tituloId = `modal-${remedio.id}-titulo`

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={tituloId}
      onClose={onFechar}
      onClick={(e) => e.target === e.currentTarget && onFechar()}
      className="m-auto w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-lg bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/50"
    >
      <div className="flex max-h-[90dvh] flex-col">
        <header className="flex shrink-0 items-start justify-between gap-4 px-6 pt-7 pb-6 sm:px-8">
          <div className="min-w-0">
            <h2 id={tituloId} className="font-serif text-2xl font-semibold tracking-tight break-words sm:text-3xl">
              {remedio.nome}
            </h2>
            <p className="mt-1 text-muted">{remedio.subtitulo}</p>
            <div className="mt-3">
              <BadgeVenda tipoVenda={remedio.tipoVenda} tarja={remedio.tarja} tom="colorido" />
            </div>
          </div>
          <div className="flex shrink-0 gap-2 pt-4">
            <BotaoFavorito nome={remedio.nome} ativo={favorito} onClick={onAlternarFavorito} tamanho="md" />
            <button
              type="button"
              onClick={onFechar}
              aria-label="Fechar"
              className="flex size-11 items-center justify-center rounded-full border border-line bg-white hover:bg-surface"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </header>

        <div role="tablist" aria-label="Seções da bula" className="flex shrink-0 gap-7 overflow-x-auto border-y border-line px-6 sm:px-8">
          {ABAS.map((a, i) => {
            const ativa = a.id === abaAtiva
            return (
              <button
                key={a.id}
                ref={(el) => {
                  abasRef.current[i] = el
                }}
                id={`aba-${a.id}`}
                role="tab"
                type="button"
                aria-selected={ativa}
                aria-controls={`painel-${a.id}`}
                tabIndex={ativa ? 0 : -1}
                onClick={() => setAbaAtiva(a.id)}
                onKeyDown={(e) => navegarAbas(e, i)}
                className={`-mb-px shrink-0 border-b-2 py-3.5 text-sm whitespace-nowrap transition-colors ${
                  ativa ? 'border-brand font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {a.label}
              </button>
            )
          })}
        </div>

        <div
          key={abaAtiva}
          id={`painel-${abaAtiva}`}
          role="tabpanel"
          aria-labelledby={`aba-${abaAtiva}`}
          className="min-h-32 flex-1 overflow-y-auto px-6 py-7 sm:px-8"
        >
          <h3 className="font-serif text-xl font-semibold tracking-tight break-words">{aba.pergunta}</h3>
          <p className="mt-4 leading-relaxed text-ink-soft">{aba.texto}</p>

          <div role="note" className="mt-6 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 sm:p-5">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 fill-amber-700 text-amber-50" aria-hidden />
            <div className="min-w-0">
              <p className="font-semibold text-amber-800">{aba.alerta.titulo}</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-800">{aba.alerta.texto}</p>
            </div>
          </div>

          <dl className={`mt-5 grid items-start gap-3 ${COLUNAS_INFOS[aba.infos.length]}`}>
            {aba.infos.map((info) => (
              <div key={info.rotulo} className="rounded-lg border border-line bg-surface px-4 py-3">
                <dt className="text-[11px] uppercase text-muted">{info.rotulo}</dt>
                <dd className="mt-1 text-sm break-words text-ink">{info.valor}</dd>
              </div>
            ))}
          </dl>

          {aba.nota && <p className="mt-6 text-xs leading-relaxed text-muted">{aba.nota}</p>}
        </div>

        <footer className="flex shrink-0 flex-col gap-4 border-t border-line bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-md text-xs text-muted">
            Protótipo acadêmico. Estas informações não substituem consulta médica ou farmacêutica.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onFechar}
              className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold hover:bg-surface"
            >
              Fechar
            </button>
            <a
              href={remedio.fonte}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark sm:flex-none"
            >
              Consultar bula completa
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </footer>
      </div>
    </dialog>
  )
}
