<script setup lang="ts">
/** Cabecalho e rodape vem do conteudo do site (secoes globais); as cores e fontes, da aparencia escolhida no painel. */
const { content, global } = useRhSite()
const vars = computed(() => templateThemeVars(content.value?.theme))
const header = computed(() => global('header'))
const footer = computed(() => global('footer'))
</script>

<template>
  <div class="tpl flex min-h-screen flex-col bg-cream font-sans text-ink" :style="vars">
    <a href="#conteudo" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-moss focus:px-5 focus:py-3 focus:text-white">Pular para o conteúdo</a>
    <RhSiteSection v-if="header" :section="header" label="Cabeçalho" />
    <main id="conteudo" class="flex-1">
      <slot />
    </main>
    <RhSiteSection v-if="footer" :section="footer" label="Rodapé" />
  </div>
</template>
