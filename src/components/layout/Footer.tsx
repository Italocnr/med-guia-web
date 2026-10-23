import { NAV_LINKS } from '../../data/navegacao'
import { Logo } from './Logo'

const REDES = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://github.com/Italocnr/med-guia-web', label: 'GitHub' },
]

export function Footer() {
  return (
    <footer id="sobre" className="bg-footer text-white">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <p className="text-center text-lg">
          Aviso Importante: Este site é um protótipo acadêmico e não substitui uma consulta médica.
        </p>

        <div className="mt-8 flex flex-col items-center gap-6 border-t border-white/15 pt-8 md:flex-row md:justify-between">
          <Logo variante="escuro" />

          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap justify-center gap-x-1 text-xs text-white/70">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  {i > 0 && <span aria-hidden> · </span>}
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-x-1 text-xs text-white/70">
            {REDES.map((rede, i) => (
              <li key={rede.label}>
                {i > 0 && <span aria-hidden> · </span>}
                <a href={rede.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {rede.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} MedGuia. Projeto acadêmico sem fins comerciais.
        </p>
      </div>
    </footer>
  )
}
