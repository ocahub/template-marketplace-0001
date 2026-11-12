<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const links = useRhLinks()
const members = useMarketMembers()
const liveEl = members.el
const count = computed(() => Number(p.value.count) || 8)
const shown = computed(() => members.items.value.slice(0, count.value))
const all = (useRuntimeConfig().public.rhfactor as { membersPath?: string }).membersPath || '/associados'
</script>

<template>
  <section v-if="shown.length || members.loading.value || editing" :id="p.anchor || undefined" ref="liveEl" class="bg-white" data-rv="members-preview">
    <div class="rv-container py-20">
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <RhText v-if="p.eyebrow || editing" tag="p" class="rv-eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
          <RhText tag="h2" class="rv-title mt-3" path="title" :value="p.title" ph="Título" />
        </div>
        <NuxtLink v-if="p.button || editing" :to="all" class="text-sm font-semibold text-moss hover:underline"><RhText path="button" :value="p.button" ph="Link" /> ({{ members.items.value.length }})</NuxtLink>
      </div>
      <ul class="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
        <template v-if="members.loading.value"><li v-for="i in count" :key="i"><div class="rh-skeleton rh-skeleton--tile" /></li></template>
        <li v-for="m in shown" v-else :key="m.slug">
          <NuxtLink :to="links.member(m.slug)" class="group block overflow-hidden rounded-2xl bg-cream ring-1 ring-sand">
            <div class="aspect-square overflow-hidden bg-moss-dark/5">
              <img v-if="(m.logo ?? m.photos[0])?.thumb" :src="(m.logo ?? m.photos[0])!.thumb!.url" :alt="m.name" class="size-full object-cover transition group-hover:scale-105" loading="lazy">
            </div>
            <div class="p-4">
              <p class="font-semibold text-moss-dark">{{ m.name }}</p>
              <p v-if="m.location" class="mt-1 text-xs text-muted">{{ m.location }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <p v-if="!shown.length && !members.loading.value" class="mt-6 text-sm text-muted">Nenhum associado no site ainda. No site, esta seção não aparece.</p>
    </div>
  </section>
</template>
