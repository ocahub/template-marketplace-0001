<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const dark = computed(() => darkBg(p.value.bg))
</script>

<template>
  <section :id="p.anchor || undefined" :class="sectionBg(p.bg)">
    <div class="rv-container grid items-center gap-12 py-20 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <RhText v-if="p.eyebrow || editing" tag="p" class="text-xs font-semibold uppercase tracking-[.2em]" :class="dark ? 'text-blush' : 'text-clay'" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <RhText tag="h2" class="font-display mt-3 text-3xl sm:text-4xl" :class="dark ? '' : 'text-moss-dark'" style="font-weight:var(--t-dw)" path="title" :value="p.title" ph="Título" />
        <RhText tag="div" class="mt-6 whitespace-pre-line leading-7" :class="dark ? 'text-white/90' : 'text-ink-2'" path="text" :value="p.text" ph="Texto" ml />
      </div>
      <img v-if="p.image" :src="p.image" alt="" class="w-full" loading="lazy">
    </div>
  </section>
</template>
