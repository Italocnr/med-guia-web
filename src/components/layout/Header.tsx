import { Heart } from 'lucide-react'
import { NAV_LINKS } from '../../data/navegacao'
import { Logo } from './Logo'

interface HeaderProps {
  totalFavoritos: number
  onAbrirFavoritos: () => void
}

export function Header({ totalFavoritos, onAbrirFavoritos }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-ink-soft">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={onAbrirFavoritos}
          className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30"
        >
          <Heart className="size-4" aria-hidden />
          Favoritos
          <span className="flex min-w-6 items-center justify-center rounded-full bg-surface px-1.5 text-xs font-semibold">
            {totalFavoritos}
          </span>
        </button>
      </div>
    </header>
  )
}
