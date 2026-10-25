import type { Tarja, TipoVenda } from '../../types/remedio'
import { TARJA_LABEL, TIPO_VENDA_LABEL } from '../../utils/remedio'

const ESTILO_TARJA: Record<Tarja, string> = {
  sem_tarja: 'bg-emerald-50 text-emerald-800 [--ponto:var(--color-emerald-600)]',
  vermelha: 'bg-red-50 text-red-800 [--ponto:var(--color-red-600)]',
  vermelha_retencao: 'bg-red-50 text-red-800 [--ponto:var(--color-red-600)]',
  preta: 'bg-ink text-white [--ponto:var(--color-white)]',
}

interface BadgeVendaProps {
  tipoVenda: TipoVenda
  tarja: Tarja
  /** "neutro" é o selo cinza dos cards; "colorido" usa a cor da tarja (modal). */
  tom?: 'neutro' | 'colorido'
}

export function BadgeVenda({ tipoVenda, tarja, tom = 'neutro' }: BadgeVendaProps) {
  const estilo = tom === 'neutro' ? 'bg-surface text-ink [--ponto:var(--color-ink)]' : ESTILO_TARJA[tarja]
  const mostrarTarja = tom === 'colorido' && tarja !== 'sem_tarja'

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-x-1.5 rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${estilo}`}
    >
      <span className="size-1.5 rounded-full bg-(--ponto)" aria-hidden />
      {TIPO_VENDA_LABEL[tipoVenda]}
      {mostrarTarja && <span className="font-normal opacity-80">· {TARJA_LABEL[tarja]}</span>}
    </span>
  )
}
