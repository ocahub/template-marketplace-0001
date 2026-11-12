<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
</script>

<template>
  <section :id="p.anchor || undefined" class="relative isolate overflow-hidden bg-moss-dark text-white">
    <img v-if="p.background" :src="p.background" alt="" class="absolute inset-0 -z-10 size-full object-cover opacity-40" loading="lazy">
    <div class="rv-container py-20">
      <RhText tag="h2" class="font-display text-3xl sm:text-4xl" style="font-weight:var(--t-dw)" path="title" :value="p.title" ph="Título" />
      <dl class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div v-for="(c, i) in p.items" :key="i" class="rounded-2xl bg-black/30 p-5 ring-1 ring-white/15 backdrop-blur">
          <dt class="text-sm font-semibold uppercase tracking-[.15em] text-blush"><RhText :path="`items.${i}.name`" :value="c.name" ph="Nome" /></dt>
          <dd class="mt-2 leading-6"><RhText :path="`items.${i}.text`" :value="c.text" ph="Texto" ml /></dd>
        </div>
      </dl>
    </div>
  </section>
</template>
