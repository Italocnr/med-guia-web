import mock from '../../mocks/remedios.mock-data.json'
import type { RemediosMock } from '../types/remedio'

// Enquanto não existe API, o catálogo vem dos dados levantados pela equipe (validados por mocks/validar-mock.js).
export const remedios = (mock as RemediosMock).remedios
