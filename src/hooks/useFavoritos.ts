import { useCallback, useEffect, useState } from 'react'

const CHAVE = 'medguia:favoritos'

const carregar = (): string[] => {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? '[]')
    return Array.isArray(salvo) ? salvo.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>(carregar)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(favoritos))
    } catch {
      // Navegação privada ou storage bloqueado: favoritos ficam só na sessão.
    }
  }, [favoritos])

  const alternar = useCallback((id: string) => {
    setFavoritos((atual) => (atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id]))
  }, [])

  const ehFavorito = useCallback((id: string) => favoritos.includes(id), [favoritos])

  return { favoritos, alternar, ehFavorito }
}
