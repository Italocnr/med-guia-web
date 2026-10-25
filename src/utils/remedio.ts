import type { AbaId, Categoria, Remedio, Tarja, TipoVenda } from '../types/remedio'

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

/** Ordem em que as categorias aparecem nos filtros ("Outros" sempre por último). */
export const CATEGORIAS: { id: Categoria; label: string }[] = [
  { id: 'analgesico', label: 'Analgésicos' },
  { id: 'anti_inflamatorio', label: 'Anti-inflamatórios' },
  { id: 'antibiotico', label: 'Antibióticos' },
  { id: 'antialergico', label: 'Antialérgicos' },
  { id: 'antigripal', label: 'Antigripais' },
  { id: 'gastro', label: 'Gastrointestinais' },
  { id: 'outro', label: 'Outros' },
]

export type FiltroVenda = 'todos' | TipoVenda

export const FILTROS_VENDA: { id: FiltroVenda; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'livre', label: 'Sem receita' },
  { id: 'receita', label: 'Com receita' },
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
