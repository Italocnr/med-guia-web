import { Info } from 'lucide-react'

export function AvisoAcademico() {
  return (
    <div className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <p
          role="note"
          className="flex items-center gap-3 rounded-3xl border border-line bg-surface px-4 py-3 text-xs leading-relaxed text-ink-soft sm:rounded-full"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <Info className="size-4" aria-hidden />
          </span>
          Este protótipo foi desenvolvido exclusivamente para fins acadêmicos. As informações apresentadas não
          substituem a bula oficial do medicamento, a orientação médica ou a consulta com um profissional de saúde.
        </p>
      </div>
    </div>
  )
}
