# MedGuia

Catálogo de medicamentos com bula simplificada em linguagem informal. Projeto acadêmico do 5º período de Biomedicina.

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

Enquanto não há API, o catálogo vem de [`mocks/remedios.mock-data.json`](mocks/remedios.mock-data.json): os 30 remédios levantados pela equipe, completados e ajustados ao schema. O [`mocks/remedios.mock.json`](mocks/remedios.mock.json) continua como mock de teste de layout (casos-limite abaixo). `npm run validar:mock` valida os dois.

- [`mocks/remedios.schema.json`](mocks/remedios.schema.json): JSON Schema (draft 2020-12) com limites de caracteres, enums e regras de coerência (venda livre ⇒ sem tarja, antibiótico ⇒ tarja vermelha com retenção).
- [`mocks/validar-mock.js`](mocks/validar-mock.js): valida o mock com `ajv` e confere ainda `total` e `id` único.

Casos de teste incluídos no mock: **Nimesulida** tem todos os textos no limite máximo de caracteres (estouro de layout) e **Loratadina** tem só 1–2 infos por aba e `nota: null`.

**Regra de conteúdo:** o site não traz posologia (dose, horário, frequência, duração ou modo de tomar). A bula simplificada fala só de para que serve, quem não deve tomar e efeitos colaterais; quem orienta como tomar é o médico ou o farmacêutico.

As informações médicas do mock **precisam ser revisadas** por um profissional antes de qualquer uso real.

## Contador de visitantes

O número "pessoas já usaram o MedGuia" no topo vem do [Abacus](https://v2.jasoncameron.dev/abacus), uma API pública e gratuita de contadores (sem cadastro), no contador `medguia-web/visitantes`. Ver [`src/hooks/useTotalVisitantes.ts`](src/hooks/useTotalVisitantes.ts).

- Cada navegador conta uma vez (marcado no `localStorage`); a contagem é aproximada, porque aba anônima ou outro dispositivo contam de novo.
- Só a build de produção incrementa; em `npm run dev` o número é apenas lido.
- Se a API estiver fora do ar, aparece um traço no lugar do número e o resto do site funciona normalmente.
- O contador expira se ficar 6 meses sem nenhum acesso.
