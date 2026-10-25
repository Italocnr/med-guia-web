// Valida mocks/remedios.mock.json contra mocks/remedios.schema.json.
// Uso: npm run validar:mock  (ou: node mocks/validar-mock.js [caminho-do-mock])
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const dir = path.dirname(fileURLToPath(import.meta.url))
const mockPath = path.resolve(process.argv[2] ?? path.join(dir, 'remedios.mock.json'))
const schemaPath = path.join(dir, 'remedios.schema.json')

const lerJson = (arquivo) => JSON.parse(fs.readFileSync(arquivo, 'utf8'))

const mock = lerJson(mockPath)
const schema = lerJson(schemaPath)

const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true })
addFormats(ajv)
const validar = ajv.compile(schema)

const erros = []

if (!validar(mock)) {
  for (const e of validar.errors) {
    // Esconde os erros genéricos do if/then: o erro real já vem logo antes.
    if (e.keyword === 'if') continue
    const { allowedValues, allowedValue, additionalProperty } = e.params ?? {}
    const detalhe = allowedValues
      ? `: ${allowedValues.join(', ')}`
      : allowedValue !== undefined
        ? ` "${allowedValue}"`
        : additionalProperty
          ? ` ("${additionalProperty}")`
          : ''
    erros.push(`${e.instancePath || '/'} ${e.message}${detalhe}`)
  }
}

// Regras que o JSON Schema não consegue expressar.
const remedios = Array.isArray(mock.remedios) ? mock.remedios : []

if (mock.total !== remedios.length) {
  erros.push(`/total é ${mock.total}, mas o array /remedios tem ${remedios.length} itens`)
}

const vistos = new Set()
remedios.forEach((r, i) => {
  if (vistos.has(r.id)) erros.push(`/remedios/${i}/id "${r.id}" repetido`)
  vistos.add(r.id)
})

const nome = path.relative(process.cwd(), mockPath)
if (erros.length) {
  console.error(`\n❌ ${nome}: ${erros.length} erro(s)\n`)
  for (const e of erros) console.error(`  • ${e}`)
  console.error()
  process.exit(1)
}

console.log(`✅ ${nome} é válido (${remedios.length} remédios).`)
