<script setup lang="ts">
/**
 * Botao do template: o link da secao leva a uma pagina do site, a outro site
 * ou, vazio, ao WhatsApp da loja (com a mensagem, se houver).
 */
const props = withDefaults(defineProps<{ link?: string | null, message?: string, source?: string }>(), { link: '', message: '', source: 'site' })
const target = computed(() => templateLink(props.link))
</script>

<template>
  <RhWhatsappButton v-if="target.kind === 'whatsapp'" :message="message" :source="source"><slot /></RhWhatsappButton>
  <a v-else-if="target.kind === 'external'" :href="target.to" target="_blank" rel="noopener"><slot /></a>
  <NuxtLink v-else :to="target.to"><slot /></NuxtLink>
</template>
