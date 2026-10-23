import mock from '../../mocks/remedios.mock.json'
import type { RemediosMock } from '../types/remedio'

// Enquanto não existe API, o catálogo vem do mock validado por mocks/validar-mock.js.
export const remedios = (mock as RemediosMock).remedios
