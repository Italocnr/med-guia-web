import type { Remedio, Tarja } from '../../types/remedio'
import { TARJA_LABEL } from '../../utils/remedio'

interface TarjaInfo {
  tarja: Tarja
  /** Classes da faixa que imita a caixa do remédio. */
  faixa: string
  /** Texto impresso na faixa, como aparece na embalagem. */
  dizeres: string | null
  texto: string
}

const TARJAS: TarjaInfo[] = [
  {
    tarja: 'sem_tarja',
    faixa: 'border-b border-dashed border-line',
    dizeres: null,
    texto:
      'Medicamentos isentos de prescrição. Podem ser comprados sem receita, mas isso não quer dizer que não tenham riscos: o farmacêutico pode orientar na hora da compra.',
  },
  {
    tarja: 'vermelha',
    faixa: 'bg-red-600 text-white',
    dizeres: 'Venda sob prescrição',
    texto: 'Só devem ser vendidos com receita de um profissional habilitado. A receita volta com você.',
  },
  {
    tarja: 'vermelha_retencao',
    faixa: 'bg-red-600 text-white',
    dizeres: 'Só pode ser vendido com retenção da receita',
    texto:
      'A farmácia fica com uma via da receita. É o caso dos antibióticos e de remédios de controle especial, como vários antidepressivos.',
  },
  {
    tarja: 'preta',
    faixa: 'bg-ink text-white',
    dizeres: 'O abuso deste medicamento pode causar dependência',
    texto:
      'Agem no sistema nervoso e têm risco de dependência. Exigem receita especial (azul ou amarela), que fica retida na farmácia.',
  },
]

const TIPOS = [
  {
    titulo: 'Referência',
    texto:
      'O remédio original, registrado com nome comercial depois dos estudos de eficácia e segurança. É a base de comparação para os outros.',
  },
  {
    titulo: 'Genérico',
    texto:
      'Mesmo princípio ativo, concentração e forma do de referência, com equivalência comprovada em testes. A caixa traz o nome do princípio ativo e uma faixa amarela com a letra G.',
  },
  {
    titulo: 'Similar',
    texto:
      'Também tem o mesmo princípio ativo, mas é vendido com nome de marca. Os similares intercambiáveis podem substituir o de referência; a lista fica no site da Anvisa.',
  },
]

interface EntendaEmbalagemProps {
  remedios: Remedio[]
}

export function EntendaEmbalagem({ remedios }: EntendaEmbalagemProps) {
  const exemplos = (tarja: Tarja) =>
    remedios
      .filter((r) => r.tarja === tarja)
      .slice(0, 3)
      .map((r) => r.nome)

  return (
    <section id="embalagem" className="scroll-mt-20 border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Entenda a embalagem</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          A cor da faixa na caixa diz como o remédio pode ser vendido e o quanto ele exige de cuidado.
        </p>

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {TARJAS.map((t) => {
            const lista = exemplos(t.tarja)
            return (
              <article key={t.tarja} className="flex flex-col bg-white">
                <div
                  className={`flex h-12 items-center px-4 text-[10px] leading-tight font-bold tracking-wide uppercase ${t.faixa}`}
                >
                  {t.dizeres ?? <span className="font-medium tracking-normal normal-case text-muted">Sem faixa</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-ink">{TARJA_LABEL[t.tarja].replace(' · ', ', ')}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{t.texto}</p>
                  {lista.length > 0 && (
                    <p className="mt-4 text-xs text-muted">
                      <span className="font-medium text-ink-soft">No catálogo:</span> {lista.join(', ')}
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <h3 className="mt-14 font-serif text-xl font-semibold text-ink">Referência, genérico ou similar?</h3>
        <dl className="mt-5 grid gap-8 sm:grid-cols-3">
          {TIPOS.map((tipo) => (
            <div key={tipo.titulo} className="border-l-2 border-brand pl-4">
              <dt className="font-semibold text-ink">{tipo.titulo}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{tipo.texto}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">
          Mais detalhes na{' '}
          <a
            href="https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/genericos"
            target="_blank"
            rel="noreferrer"
            className="text-brand underline underline-offset-2 hover:text-brand-dark"
          >
            página de genéricos da Anvisa
          </a>
          .
        </p>
      </div>
    </section>
  )
}
