<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const store = useRhStore()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-moss-dark">
    <img v-if="p.background" :src="p.background" alt="" class="absolute inset-0 -z-10 size-full object-cover opacity-70">
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/20 to-moss-dark/90" />
    <div class="rv-container flex min-h-[78vh] flex-col items-center justify-center py-24 text-center">
      <img v-if="p.logo" :src="p.logo" alt="" class="h-40 w-auto sm:h-52">
      <!-- Titulo em imagem: continua sendo o h1 da pagina (o texto vai no alt, para o Google). -->
      <h1 v-if="p.titleImage" class="mt-8 w-full max-w-2xl"><img :src="p.titleImage" :alt="p.title || store?.name || ''" class="w-full"></h1>
      <RhText v-else tag="h1" class="font-display mt-8 max-w-3xl text-4xl text-white sm:text-6xl" style="font-weight:var(--t-dw)" path="title" :value="p.title" ph="Título" />
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <TButton v-if="p.button || editing" class="rv-button" :link="p.link"><RhText path="button" :value="p.button" ph="Botão" /></TButton>
        <TButton v-if="p.button2 || editing" class="rv-button rv-button--ghost" :link="p.link2"><RhText path="button2" :value="p.button2" ph="Botão" /></TButton>
      </div>
    </div>
  </section>
</template>
