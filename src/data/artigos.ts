import { FileSearch, Pill, ShieldAlert, type LucideIcon } from 'lucide-react'

export interface Artigo {
  id: string
  titulo: string
  resumo: string
  minutosLeitura: number
  icone: LucideIcon
  /** Classes do gradiente da capa. */
  capa: string
}

export const artigos: Artigo[] = [
  {
    id: 'automedicacao',
    titulo: 'Perigos da Automedicação',
    resumo: 'Entenda os riscos de combinar medicamentos sem orientação profissional.',
    minutosLeitura: 6,
    icone: Pill,
    capa: 'from-indigo-500 via-violet-500 to-sky-400',
  },
  {
    id: 'ler-bula',
    titulo: 'Como ler uma bula com segurança',
    resumo: 'Um guia simples para identificar indicações, alertas e interações.',
    minutosLeitura: 5,
    icone: FileSearch,
    capa: 'from-sky-500 via-cyan-500 to-teal-400',
  },
  {
    id: 'antibioticos',
    titulo: 'Antibióticos: uso responsável',
    resumo: 'Por que respeitar horários e duração protege você e a comunidade.',
    minutosLeitura: 7,
    icone: ShieldAlert,
    capa: 'from-violet-500 via-purple-500 to-fuchsia-400',
  },
]
