# Site da Casa da Tinta (Londrina - PR)

Site estático de uma página: HTML, CSS e JavaScript puro, sem etapa de build.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Conteúdo da página (textos, endereço, horários) |
| `styles.css` | Visual |
| `cores.js` | **Cartela de cores.** Para adicionar ou remover uma cor, edite este arquivo |
| `app.js` | Interação (abas, filtros, botão de pedir cor no WhatsApp) |
| `favicon.svg` | Ícone da aba do navegador |

## Testar no computador

Basta abrir o `index.html` no navegador.

## Publicar

1. Crie um repositório no GitHub e envie estes arquivos.
2. **Vercel:** Add New → Project → importe o repositório → Framework Preset: **Other** → Deploy.
   - Atenção: o plano gratuito (Hobby) é só para uso não comercial. Para site de loja, use o **Pro**
     ou publique no **Cloudflare Pages** / **Netlify** (os planos gratuitos deles permitem uso comercial;
     o processo é o mesmo: conectar o GitHub e fazer o deploy, sem comando de build).
3. Domínio próprio: registre em https://registro.br e adicione em Settings → Domains.

## Editar dados

- WhatsApp: procure por `554330277157` em `index.html` e `app.js`.
- Horário: procure por `8h` em `index.html` (topo, "Como comprar" e "Onde estamos") e ajuste `openingHours` no bloco JSON-LD do topo.
