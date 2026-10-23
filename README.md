# MedGuia

Catálogo de medicamentos com bula simplificada em linguagem informal. Projeto acadêmico de Farmácia.

> ⚠️ Protótipo acadêmico. As informações não substituem a bula oficial, a orientação médica ou a consulta com um profissional de saúde.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS v4 + lucide-react.

## Rodando

```bash
npm install
npm run dev           # servidor de desenvolvimento
npm run build         # checagem de tipos + build de produção
npm run lint          # oxlint
npm run validar:mock  # valida o mock contra o JSON Schema
```

## Mock de dados

Enquanto não há API, o catálogo vem de [`mocks/remedios.mock.json`](mocks/remedios.mock.json):

- [`mocks/remedios.schema.json`](mocks/remedios.schema.json): JSON Schema (draft 2020-12) com limites de caracteres, enums e regras de coerência (venda livre ⇒ sem tarja, antibiótico ⇒ tarja vermelha com retenção).
- [`mocks/validar-mock.js`](mocks/validar-mock.js): valida o mock com `ajv` e confere ainda `total` e `id` único.

Casos de teste incluídos no mock: **Nimesulida** tem todos os textos no limite máximo de caracteres (estouro de layout) e **Loratadina** tem só 1–2 infos por aba e `nota: null`. Os itens com `controle.status` diferente de `revisado` aparecem com um selo no modo de desenvolvimento.

As informações médicas do mock **precisam ser revisadas** por um profissional antes de qualquer uso real.
