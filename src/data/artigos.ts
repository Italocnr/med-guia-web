export interface Artigo {
  id: string
  titulo: string
  resumo: string
  /** Quem publicou o artigo original. */
  fonte: string
  url: string
}

export const artigos: Artigo[] = [
  {
    id: 'automedicacao',
    titulo: 'Os perigos da automedicação',
    resumo: 'Entenda os riscos de combinar medicamentos sem orientação profissional.',
    fonte: 'Conass',
    url: 'https://www.conass.org.br/no-dia-do-uso-racional-de-medicamentos-conass-alerta-para-os-perigos-da-automedicacao/',
  },
  {
    id: 'ler-bula',
    titulo: 'Como ler uma bula com segurança',
    resumo: 'Cartilha da Anvisa sobre bulas, uso em crianças, álcool e outros cuidados com medicamentos.',
    fonte: 'Anvisa (PDF)',
    url: 'https://www.portovelho.ro.gov.br/uploads/arquivos/2016/11/20985/1480084005cartilha-o-que-devemos-saber-sobre-medicamentos1.pdf',
  },
  {
    id: 'antibioticos',
    titulo: 'Antibióticos: uso responsável',
    resumo: 'Por que o uso errado de antibióticos cria bactérias resistentes, e como prevenir.',
    fonte: 'Fiocruz (PDF)',
    url: 'https://ioc.fiocruz.br/sites/default/files/mediaSiteIOCPubliq20230621/resistencia_bacteriana_antibioticos_ioc_fiocruz.pdf',
  },
]
