<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
</script>

<template>
  <section :id="p.anchor || undefined" class="bg-cream">
    <div class="rv-container py-20">
      <div class="grid gap-10 lg:grid-cols-2">
        <div>
          <RhText v-if="p.eyebrow || editing" tag="p" class="rv-eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
          <RhText tag="h2" class="rv-title mt-3" path="title" :value="p.title" ph="Título" />
          <RhText tag="p" class="rv-lead mt-6" path="lead" :value="p.lead" ph="Texto" ml />
          <RhText v-if="p.highlight || editing" tag="p" class="mt-2 text-lg font-semibold text-moss-dark" path="highlight" :value="p.highlight" ph="Destaque" />
          <RhText v-if="p.text || editing" tag="p" class="rv-lead mt-4" path="text" :value="p.text" ph="Texto" ml />
        </div>
        <div class="rounded-2xl bg-moss p-8 text-white">
          <RhText tag="h3" class="text-xl font-bold" path="cardTitle" :value="p.cardTitle" ph="Título" />
          <RhText tag="p" class="mt-4 leading-7 text-white/90" path="cardText" :value="p.cardText" ph="Texto" ml />
        </div>
      </div>
      <div v-if="p.image" class="mt-12 rounded-2xl bg-moss-dark p-6"><img :src="p.image" alt="" class="w-full" loading="lazy"></div>
    </div>
  </section>
</template>
