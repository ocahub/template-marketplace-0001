<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
</script>

<template>
  <section :id="p.anchor || undefined" class="bg-slate2 text-white">
    <div class="rv-container py-20">
      <h2 class="font-display text-3xl sm:text-4xl" style="font-weight:var(--t-dw)"><RhText path="title" :value="p.title" ph="Título" /><span v-if="p.footnote" class="text-blush">*</span></h2>
      <dl class="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3">
        <div v-for="(s, i) in p.items" :key="i">
          <dt class="text-sm uppercase tracking-[.15em] text-white/70"><RhText :path="`items.${i}.label`" :value="s.label" ph="Nome" /></dt>
          <dd class="mt-2 text-3xl font-bold sm:text-4xl"><RhText :path="`items.${i}.value`" :value="s.value" ph="0" /></dd>
          <dd v-if="s.note || editing" class="text-xs text-white/60"><RhText :path="`items.${i}.note`" :value="s.note" ph="Nota" /></dd>
        </div>
      </dl>
      <p v-if="p.footnote || editing" class="mt-10 text-xs text-white/60">*<RhText path="footnote" :value="p.footnote" ph="Nota de rodapé" /></p>
    </div>
  </section>
</template>
