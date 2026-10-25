import { useEffect, useState } from 'react'

// Abacus: contador público e gratuito, sem cadastro (https://v2.jasoncameron.dev/abacus).
// O contador some se ninguém acessar por 6 meses.
const API = 'https://abacus.jasoncameron.dev'
const CONTADOR = 'medguia-web/visitantes'
const CHAVE_VISITOU = 'medguia:visitou'

const jaVisitou = () => {
  try {
    return localStorage.getItem(CHAVE_VISITOU) === '1'
  } catch {
    return false
  }
}

const marcarVisita = () => {
  try {
    localStorage.setItem(CHAVE_VISITOU, '1')
  } catch {
    // Storage bloqueado: esse navegador volta a contar na próxima visita.
  }
}

const buscarTotal = async (): Promise<number | null> => {
  // Cada navegador conta uma vez. Em dev só lê, para os testes locais não inflarem o número.
  const contar = import.meta.env.PROD && !jaVisitou()
  try {
    const resposta = await fetch(`${API}/${contar ? 'hit' : 'get'}/${CONTADOR}`)
    if (!resposta.ok) return null
    const { value } = await resposta.json()
    if (contar) marcarVisita()
    return typeof value === 'number' ? value : null
  } catch {
    return null
  }
}

// Fica fora do hook para o StrictMode (que monta duas vezes) não contar a mesma visita duas vezes.
let requisicao: Promise<number | null> | null = null

/** Total de navegadores que já abriram o site; `null` enquanto carrega ou se a API falhar. */
export function useTotalVisitantes() {
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    let ativo = true
    requisicao ??= buscarTotal()
    requisicao.then((valor) => ativo && setTotal(valor))
    return () => {
      ativo = false
    }
  }, [])

  return total
}
