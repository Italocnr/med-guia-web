import { NAV_LINKS } from '../../data/navegacao'
import { Logo } from './Logo'

const INTEGRANTES = [
  'Tayna Carneiro da Silva',
  'Carolina F. de Oliveira Barros',
  'Marcella Alves Aguiar',
  'Ana Cecília Chaves Nunes',
  'Elaine dos Anjos Barbosa Fonseca',
]

const DESENVOLVEDOR = { nome: 'Italo Eduardo Carneiro da Silva', curso: 'Engenharia de Software' }

const GITHUB = 'https://github.com/Italocnr/med-guia-web'

const listaIntegrantes = new Intl.ListFormat('pt-BR', { type: 'conjunction' }).format(INTEGRANTES)

export function Footer() {
  return (
    <footer id="sobre" className="scroll-mt-20 bg-footer text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="max-w-xl">
            <Logo variante="escuro" />
            <h2 className="mt-6 font-serif text-xl font-semibold">Sobre o projeto</h2>
            <p className="mt-3 leading-relaxed text-white/80">
              Projeto criado pelas integrantes {listaIntegrantes}, do 5º período do curso de Biomedicina.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Site desenvolvido por {DESENVOLVEDOR.nome}, estudante de {DESENVOLVEDOR.curso}.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Este site é um protótipo acadêmico. As informações não substituem a bula oficial, a orientação
              médica ou a consulta com um profissional de saúde.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-sm">
            <nav aria-label="Rodapé">
              <h2 className="text-xs font-semibold tracking-wide text-white/50 uppercase">Navegação</h2>
              <ul className="mt-3 space-y-2 text-white/80">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-2 text-white/80 hover:text-white"
            >
              {/* O lucide não tem mais ícones de marca; este é o logo oficial do GitHub. */}
              <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Código no GitHub
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-white/15 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} MedGuia. Projeto acadêmico sem fins comerciais.
        </p>
      </div>
    </footer>
  )
}
