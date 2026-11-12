<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
useHead({ title: notFound.value ? 'Página não encontrada' : 'Site indisponível' })
</script>

<template>
  <NuxtLayout>
    <section class="rv-container py-24">
      <p class="rv-eyebrow">{{ error.statusCode }}</p>
      <h1 class="rv-title mt-3">{{ notFound ? 'Não encontramos esta página' : 'O site está indisponível no momento' }}</h1>
      <p class="rv-lead mt-4">{{ notFound ? 'O endereço pode ter mudado. Que tal começar pelo início?' : 'Tente de novo em alguns instantes.' }}</p>
      <button type="button" class="rv-button mt-8" @click="clearError({ redirect: '/' })">Voltar para o início</button>
    </section>
  </NuxtLayout>
</template>
