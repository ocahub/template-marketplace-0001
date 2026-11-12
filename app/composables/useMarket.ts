/**
 * O marketplace nas secoes (00048): os produtos de todos os associados e os
 * associados. O retrato do build vai no HTML; os atuais vem da API publica
 * quando a secao aparece na tela.
 */
export interface MarketProduct { storeId: string, memberSlug: string, memberName: string, product: any }
export interface MarketMember { slug: string, name: string, location?: string | null, logo?: { thumb?: { url: string } | null } | null, photos: { thumb?: { url: string } | null }[] }

export function useMarketProducts() {
  const api = useRhPublic()
  const live = useRhLive('sales:marketplace-products:1:12', () => api.get<{ items: MarketProduct[] }>('sales', '/marketplace/products', { page: 1, size: 12 }))
  return { ...live, items: computed(() => live.data.value?.items ?? []) }
}

export function useMarketMembers() {
  const api = useRhPublic()
  const live = useRhLive('sales:marketplace-members', () => api.get<MarketMember[]>('sales', '/marketplace/members'))
  return { ...live, items: computed(() => live.data.value ?? []) }
}

/** O fundo da secao escolhido no painel. */
export function sectionBg(bg?: string) {
  return bg === 'verde' ? 'bg-moss text-white' : bg === 'escuro' ? 'bg-moss-dark text-white' : bg === 'branco' ? 'bg-white' : 'bg-cream'
}
export const darkBg = (bg?: string) => bg === 'verde' || bg === 'escuro'
