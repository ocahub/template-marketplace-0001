<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const dark = computed(() => darkBg(p.value.bg))
</script>

<template>
  <section :id="p.anchor || undefined" :class="sectionBg(p.bg)">
    <div class="rv-container max-w-4xl py-20">
      <RhText v-if="p.eyebrow || editing" tag="p" class="rv-eyebrow" :class="{ '!text-blush': dark }" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
      <RhText tag="h2" class="rv-title mt-3" :class="{ '!text-white': dark }" path="title" :value="p.title" ph="Título" />
      <RhText tag="div" class="rv-lead mt-6 whitespace-pre-line" :class="{ '!text-white/90': dark }" path="text" :value="p.text" ph="Texto" ml />
    </div>
  </section>
</template>
