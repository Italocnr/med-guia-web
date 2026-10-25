import { Phone } from 'lucide-react'

const CUIDADOS = [
  {
    titulo: 'Conte tudo o que você usa',
    texto: 'Outros remédios, vitaminas, chás e suplementos podem interagir. Fale de todos ao médico ou farmacêutico.',
  },
  {
    titulo: 'Avise sobre sua saúde',
    texto: 'Gravidez, amamentação, alergias e doenças no fígado, rins ou coração mudam o que é seguro para você.',
  },
  {
    titulo: 'Confira a caixa',
    texto: 'Veja a validade e se o remédio está com cor, cheiro e aspecto normais. Na dúvida, não use.',
  },
  {
    titulo: 'Remédio é pessoal',
    texto: 'Não use o que foi receitado para outra pessoa, nem empreste o seu, mesmo que os sintomas pareçam iguais.',
  },
  {
    titulo: 'Guarde do jeito certo',
    texto: 'Em lugar seco, longe do sol e do calor, e fora do alcance de crianças e animais. Banheiro e cozinha não são bons lugares.',
  },
  {
    titulo: 'Descarte com cuidado',
    texto: 'Não jogue no lixo comum nem no vaso. Leve sobras e vencidos a um ponto de coleta; muitas farmácias recebem.',
  },
]

const CONTATOS = [
  { nome: 'SAMU', numero: '192', telefone: '192', texto: 'Urgência e emergência médica.' },
  {
    nome: 'Disque-Intoxicação',
    numero: '0800 722 6001',
    telefone: '08007226001',
    texto: 'Ligação gratuita, da Anvisa, para casos de intoxicação e ingestão acidental.',
  },
]

export function Cuidados() {
  return (
    <section id="cuidados" className="scroll-mt-20 border-b border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Antes de usar qualquer remédio</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">Cuidados que valem para todos os medicamentos, com ou sem receita.</p>

          <ol className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {CUIDADOS.map((c, i) => (
              <li key={c.titulo} className="flex gap-4">
                <span className="font-serif text-2xl leading-none font-semibold text-brand tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{c.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="self-start rounded-lg border border-red-200 bg-red-50/60 p-6">
          <h2 className="font-semibold text-red-900">Em caso de emergência</h2>
          <ul className="mt-4 space-y-4">
            {CONTATOS.map((c) => (
              <li key={c.nome}>
                <p className="text-sm font-semibold text-red-900">{c.nome}</p>
                <a
                  href={`tel:${c.telefone}`}
                  className="mt-0.5 flex w-fit items-center gap-2 text-xl font-bold text-red-900 tabular-nums hover:underline"
                >
                  <Phone className="size-4" aria-hidden />
                  {c.numero}
                </a>
                <p className="mt-1 text-sm text-red-900/75">{c.texto}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-red-200 pt-4 text-sm leading-relaxed text-red-900/80">
            Teve uma reação inesperada a um remédio? Além de procurar atendimento, você pode notificar a Anvisa
            pelo{' '}
            <a
              href="https://www.gov.br/anvisa/pt-br/assuntos/fiscalizacao-e-monitoramento/notificacoes/vigimed"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-2"
            >
              VigiMed
            </a>
            .
          </p>
        </aside>
      </div>
    </section>
  )
}
