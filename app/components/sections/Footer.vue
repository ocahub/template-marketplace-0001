<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const company = useRhCompany()
const v = computed(() => company.values.value)
const lines = computed(() => (p.value.address || v.value.endereco || '').split('\n').filter(Boolean))
const wa = computed(() => company.whatsappUrl())
</script>

<template>
  <footer id="contato" class="bg-moss-dark text-white/85">
    <div class="rv-container grid gap-10 py-14 md:grid-cols-3">
      <div>
        <RhText tag="h2" class="text-sm font-semibold uppercase tracking-[.2em] text-white" path="addressTitle" :value="p.addressTitle" ph="Endereço" />
        <p class="mt-3 text-sm leading-6"><template v-for="(l, i) in lines" :key="i">{{ company.text(l) }}<br></template></p>
      </div>
      <div>
        <h2 class="text-sm font-semibold uppercase tracking-[.2em] text-white">Contato</h2>
        <RhText v-if="p.contactText || editing" tag="p" class="mt-3 text-sm text-white/70" path="contactText" :value="p.contactText" ph="Texto" />
        <ul class="mt-2 space-y-1 text-sm">
          <li v-if="v.email"><a :href="`mailto:${v.email}`" class="hover:underline">{{ v.email }}</a></li>
          <li v-if="wa"><a :href="wa" target="_blank" rel="noopener" class="hover:underline">WhatsApp {{ v.whatsapp }}</a></li>
          <li class="flex gap-4 pt-2">
            <a v-if="p.facebook" :href="p.facebook" target="_blank" rel="noopener" class="hover:underline">Facebook</a>
            <a v-if="company.instagramUrl.value" :href="company.instagramUrl.value" target="_blank" rel="noopener" class="hover:underline">Instagram</a>
          </li>
        </ul>
      </div>
      <div v-if="p.logos?.length || editing">
        <RhText tag="h2" class="text-sm font-semibold uppercase tracking-[.2em] text-white" path="supportTitle" :value="p.supportTitle" ph="Apoio" />
        <div class="mt-4 flex flex-wrap items-center gap-6">
          <img v-for="(l, i) in p.logos" :key="i" :src="l.image" :alt="l.alt" class="h-10 w-auto">
        </div>
      </div>
    </div>
    <div class="border-t border-white/10">
      <RhText tag="p" class="rv-container block py-5 text-xs text-white/60" path="copyright" :value="p.copyright" ph="Linha final" />
    </div>
  </footer>
</template>
