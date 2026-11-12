<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const store = useRhStore()
const market = useMarketProducts()
const liveEl = market.el
const count = computed(() => Number(p.value.count) || 8)
const list = computed(() => market.items.value.slice(0, count.value))
const all = (useRuntimeConfig().public.rhfactor as { marketplaceProductsPath?: string }).marketplaceProductsPath || '/produtos'
</script>

<template>
  <section v-if="list.length || market.loading.value || editing" ref="liveEl" class="bg-cream" data-rv="featured-coffees">
    <div class="rv-container py-20">
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <RhText v-if="p.eyebrow || editing" tag="p" class="rv-eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
          <RhText tag="h2" class="rv-title mt-3" path="title" :value="p.title" ph="Título" />
          <RhText v-if="p.text || editing" tag="p" class="rv-lead mt-3 max-w-2xl" path="text" :value="p.text" ph="Texto" />
        </div>
        <NuxtLink v-if="p.button || editing" :to="all" class="text-sm font-semibold text-moss hover:underline"><RhText path="button" :value="p.button" ph="Link" /></NuxtLink>
      </div>
      <ul v-if="market.loading.value" class="rh-grid mt-10"><li v-for="i in count" :key="i"><div class="rh-skeleton rh-skeleton--tile" /></li></ul>
      <ul v-else-if="list.length" class="rh-grid mt-10">
        <li v-for="i in list" :key="`${i.storeId}:${i.product.id}`">
          <RhProductCard :product="i.product" :format="store?.imageFormat" :member="i.memberSlug" :seller="i.memberName" />
        </li>
      </ul>
      <p v-else class="mt-10 text-sm text-muted">Nenhum produto dos associados à venda agora. No site, esta seção não aparece.</p>
    </div>
  </section>
</template>
