// Template de site de marketplace 0001 (00047), feito a partir do site da Regiao
// Vulcanica: o institucional da associacao (a regiao, o territorio, os numeros,
// a organizacao) e o MARKETPLACE dos associados pelo @ocahub/kit - a lista e a
// pagina de cada associado, os produtos de todos, o carrinho com varias lojas,
// a entrega e o pagamento por loja. O conteudo a tenant edita no painel em
// Loja › Site › Editar páginas; o build le a versao publicada no cloud-management.
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@ocahub/kit'],
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  rhfactor: {
    storeId: process.env.RHFACTOR_STORE_ID ?? '',
    apiBase: process.env.RHFACTOR_API_BASE ?? 'http://localhost:8085',
    iamBase: process.env.RHFACTOR_IAM_BASE ?? 'http://localhost:8080',
    contractsBase: process.env.RHFACTOR_CONTRACTS_BASE ?? 'http://localhost:8082',
    paymentsBase: process.env.RHFACTOR_PAYMENTS_BASE ?? 'http://localhost:8089',
    marketplace: true,
    // A inicial e do template; os produtos de todos os associados ficam em /produtos.
    pages: { shelf: false },
    siteContent: true
  },

  components: [
    { path: '~/components/sections', prefix: 'Section', global: true },
    '~/components'
  ],

  css: ['~/assets/css/main.css', '~/assets/css/loja.css'],
  tailwindcss: { configPath: 'tailwind.config.ts', cssPath: false },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lora:wght@500;600;700&display=swap' }
      ]
    }
  }
})
