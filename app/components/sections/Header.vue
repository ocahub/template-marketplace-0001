<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const store = useRhStore()
const { menu } = useRhSite()
const company = useRhCompany()
const logo = computed(() => p.value.logoImage || store.value?.logoUrl || '')
const nameLines = computed(() => (p.value.name || '').split('\n').filter(Boolean))
const links = computed(() => [
  ...(p.value.links ?? []).map((l: { label: string, link: string }) => ({ to: l.link || '/', label: company.text(l.label) })),
  ...menu.value.map(m => ({ to: m.slug, label: m.title }))
])
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
const isActive = (to: string) => !to.includes('#') && to !== '/' && route.path.startsWith(to)
</script>

<template>
  <header class="sticky top-0 z-50 bg-moss-dark/95 text-white backdrop-blur">
    <div class="rv-container flex items-center justify-between gap-4 py-3">
      <NuxtLink to="/" class="flex items-center gap-3" :aria-label="`${store?.name ?? ''} - início`">
        <img v-if="logo" :src="logo" alt="" class="h-12 w-auto">
        <span v-if="nameLines.length" class="text-sm font-semibold leading-tight tracking-wide"><template v-for="(l, i) in nameLines" :key="i">{{ l }}<br v-if="Number(i) < nameLines.length - 1"></template></span>
        <span v-else-if="!logo" class="text-base font-semibold">{{ store?.name }}</span>
      </NuxtLink>
      <nav class="hidden items-center gap-6 lg:flex" aria-label="Principal">
        <NuxtLink v-for="link in links" :key="link.to + link.label" :to="link.to" class="py-2 text-sm transition-colors hover:text-blush" :class="isActive(link.to) ? 'text-blush underline underline-offset-8' : 'text-white/85'">{{ link.label }}</NuxtLink>
        <div class="rv-header-actions"><RhAccountButton /><RhCartButton /></div>
      </nav>
      <div class="lg:hidden">
        <div class="rv-header-actions">
          <RhCartButton />
          <button class="flex h-11 w-11 items-center justify-center rounded-full" :aria-expanded="open" aria-controls="menu-mobile" :aria-label="open ? 'Fechar menu' : 'Abrir menu'" @click="open = !open">
            <svg v-if="!open" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h10" /></svg>
            <svg v-else class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
      </div>
    </div>
    <nav v-if="open" id="menu-mobile" class="border-t border-white/10 lg:hidden" aria-label="Principal">
      <div class="rv-container flex flex-col py-2">
        <NuxtLink v-for="link in links" :key="link.to + link.label" :to="link.to" class="flex min-h-[48px] items-center border-b border-white/10 text-lg last:border-0">{{ link.label }}</NuxtLink>
        <NuxtLink to="/minha-conta" class="flex min-h-[48px] items-center text-sm text-white/80">Minha conta</NuxtLink>
      </div>
    </nav>
  </header>
</template>
