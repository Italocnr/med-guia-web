import { useState } from 'react'
import { Artigos } from './components/artigos/Artigos'
import { Catalogo } from './components/catalogo/Catalogo'
import { Hero } from './components/home/Hero'
import { AvisoAcademico } from './components/layout/AvisoAcademico'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { RemedioModal } from './components/remedio/RemedioModal'
import { remedios } from './data/remedios'
import { useFavoritos } from './hooks/useFavoritos'
import type { Remedio } from './types/remedio'

const irParaCatalogo = () => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })

export default function App() {
  const { favoritos, alternar, ehFavorito } = useFavoritos()
  const [busca, setBusca] = useState('')
  const [somenteFavoritos, setSomenteFavoritos] = useState(false)
  const [selecionado, setSelecionado] = useState<Remedio | null>(null)

  const buscar = (termo: string) => {
    setBusca(termo.trim())
    if (termo.trim()) irParaCatalogo()
  }

  const abrirFavoritos = () => {
    setSomenteFavoritos(true)
    irParaCatalogo()
  }

  return (
    <>
      <Header totalFavoritos={favoritos.length} onAbrirFavoritos={abrirFavoritos} />
      <AvisoAcademico />

      <main>
        <Hero totalRemedios={remedios.length} onBuscar={buscar} />
        <Catalogo
          remedios={remedios}
          busca={busca}
          onLimparBusca={() => setBusca('')}
          somenteFavoritos={somenteFavoritos}
          onSairDosFavoritos={() => setSomenteFavoritos(false)}
          ehFavorito={ehFavorito}
          onAlternarFavorito={alternar}
          onVerBula={setSelecionado}
        />
        <Artigos />
      </main>

      <Footer />

      {selecionado && (
        <RemedioModal
          key={selecionado.id}
          remedio={selecionado}
          favorito={ehFavorito(selecionado.id)}
          onAlternarFavorito={() => alternar(selecionado.id)}
          onFechar={() => setSelecionado(null)}
        />
      )}
    </>
  )
}
