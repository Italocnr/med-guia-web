import logo from '../../assets/logo.png'

interface LogoProps {
  variante?: 'claro' | 'escuro'
}

export function Logo({ variante = 'claro' }: LogoProps) {
  const escuro = variante === 'escuro'

  return (
    <a href="#inicio" className="flex items-center gap-3" aria-label="MedGuia, voltar ao início">
      <span
        className={`flex size-10 items-center justify-center rounded-full ${
          escuro ? 'bg-white/10 ring-1 ring-white/25' : 'bg-white ring-1 ring-line'
        }`}
      >
        <img src={logo} alt="" className="size-7 object-contain" />
      </span>
      <span className={`text-xl font-medium tracking-tight ${escuro ? 'text-white' : 'text-ink'}`}>MedGuia</span>
    </a>
  )
}
