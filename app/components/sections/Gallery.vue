<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const dark = computed(() => darkBg(p.value.bg))
</script>

<template>
  <section :id="p.anchor || undefined" :class="sectionBg(p.bg)">
    <div class="rv-container py-20">
      <div class="grid gap-10 lg:grid-cols-2">
        <div>
          <RhText v-if="p.eyebrow || editing" tag="p" class="rv-eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
          <RhText tag="h2" class="rv-title mt-3" :class="{ '!text-white': dark }" path="title" :value="p.title" ph="Título" />
        </div>
        <RhText tag="div" class="rv-lead whitespace-pre-line" :class="{ '!text-white/90': dark }" path="text" :value="p.text" ph="Texto" ml />
      </div>
      <ul v-if="p.images?.length" class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        <li v-for="(x, i) in p.images" :key="i" class="overflow-hidden rounded-2xl"><img v-if="x.image" :src="x.image" :alt="x.alt" class="aspect-[3/4] w-full object-cover" loading="lazy"></li>
      </ul>
    </div>
  </section>
</template>
