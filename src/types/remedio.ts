// Espelha a estrutura de mocks/remedios.schema.json.

export type Categoria =
  | 'analgesico'
  | 'antibiotico'
  | 'anti_inflamatorio'
  | 'antialergico'
  | 'gastro'
  | 'antigripal'
  | 'outro'

export type TipoVenda = 'livre' | 'receita'

export type Tarja = 'sem_tarja' | 'vermelha' | 'vermelha_retencao' | 'preta'

export type StatusConteudo = 'rascunho' | 'pronto' | 'revisado'

export interface Info {
  rotulo: string
  valor: string
}

export interface Aba {
  pergunta: string
  texto: string
  alerta: {
    titulo: string
    texto: string
  }
  infos: Info[]
  nota: string | null
}

export type AbaId = 'indicacoes' | 'contraindicacoes' | 'efeitosColaterais'

export interface Remedio {
  id: string
  nome: string
  subtitulo: string
  principioAtivo: string
  categoria: Categoria
  tipoVenda: TipoVenda
  tarja: Tarja
  resumo: {
    paraQueServe: string
  }
  abas: Record<AbaId, Aba>
  fonte: string
  controle: {
    responsavel: string
    status: StatusConteudo
    revisadoPor: string | null
  }
}

export interface RemediosMock {
  geradoEm: string
  total: number
  remedios: Remedio[]
}
