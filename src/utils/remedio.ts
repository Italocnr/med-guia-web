import type { AbaId, Remedio, Tarja, TipoVenda } from '../types/remedio'

export const ABAS: { id: AbaId; label: string }[] = [
  { id: 'indicacoes', label: 'Indicações' },
  { id: 'contraindicacoes', label: 'Contraindicações' },
  { id: 'efeitosColaterais', label: 'Efeitos Colaterais' },
]

export const TIPO_VENDA_LABEL: Record<TipoVenda, string> = {
  livre: 'Venda Livre',
  receita: 'Receita Obrigatória',
}

export const TARJA_LABEL: Record<Tarja, string> = {
  sem_tarja: 'Sem Tarja',
  vermelha: 'Tarja Vermelha',
  vermelha_retencao: 'Tarja Vermelha · Retém Receita',
  preta: 'Tarja Preta',
}

export type FiltroId =
  | 'todos'
  | 'analgesicos'
  | 'antibioticos'
  | 'anti_inflamatorios'
  | 'sem_receita'
  | 'tarja_vermelha'

export const FILTROS: { id: FiltroId; label: string; aplica: (r: Remedio) => boolean }[] = [
  { id: 'todos', label: 'Todos', aplica: () => true },
  { id: 'analgesicos', label: 'Analgésicos', aplica: (r) => r.categoria === 'analgesico' },
  { id: 'antibioticos', label: 'Antibióticos', aplica: (r) => r.categoria === 'antibiotico' },
  { id: 'anti_inflamatorios', label: 'Anti-inflamatórios', aplica: (r) => r.categoria === 'anti_inflamatorio' },
  { id: 'sem_receita', label: 'Sem Receita', aplica: (r) => r.tipoVenda === 'livre' },
  {
    id: 'tarja_vermelha',
    label: 'Tarja Vermelha',
    aplica: (r) => r.tarja === 'vermelha' || r.tarja === 'vermelha_retencao',
  },
]

/** Minúsculo e sem acento, para a busca ignorar "Dipirona" x "dipirona" x "díPIRONA". */
export const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

export const correspondeBusca = (remedio: Remedio, busca: string) => {
  const termo = normalizar(busca)
  if (!termo) return true
  return [remedio.nome, remedio.principioAtivo, remedio.subtitulo].some((campo) =>
    normalizar(campo).includes(termo),
  )
}
