import manifest from '~~/template.json'

/**
 * O template.json (00047): secoes, campos, aparencias e o conteudo padrao.
 * O painel le o mesmo arquivo (pelo cloud-management) para montar o editor.
 */
export const TEMPLATE = manifest

type Props = Record<string, any>
type SectionRef = string | { type: string, props?: Props }

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v))

/** "hero" ou { type, props }: o padrao da secao com o que a pagina muda. */
export function templateSection(ref: SectionRef, id: string) {
  const type = typeof ref === 'string' ? ref : ref.type
  const base = (manifest.sectionDefaults as Record<string, Props>)[type] ?? {}
  return { id, type, props: { ...clone(base), ...(typeof ref === 'string' ? {} : clone(ref.props ?? {})) } }
}

/** O conteudo padrao do template, para quando nada foi publicado ainda. */
export function templateDefaultContent() {
  return {
    template: { id: manifest.id, version: manifest.version },
    theme: { ...manifest.defaults.theme },
    globals: {
      header: templateSection('header', 'header'),
      footer: templateSection('footer', 'footer')
    },
    pages: manifest.defaults.pages.map((p, i) => ({
      id: i === 0 ? 'p-home' : `p-${i}`,
      title: p.title, slug: p.slug, menu: p.menu, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
      sections: (p.sections as SectionRef[]).map((s, j) => templateSection(s, `s-${i}-${j}`))
    }))
  }
}

const KEYS = ['moss', 'mossDark', 'mossLight', 'clay', 'clayDark', 'ember', 'slate', 'cream', 'sand', 'blush', 'ink', 'ink2', 'muted'] as const
const kebab = (k: string) => k.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)
/** "#4A6548" -> "74 101 72": o Tailwind usa rgb(var(--t-moss) / <alpha>) e aceita as opacidades (bg-moss/90). */
const triplet = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(' ')

/** Cores e fontes escolhidas no painel, como variaveis CSS (as cores do Tailwind leem delas). */
export function templateThemeVars(theme: Record<string, string> | undefined) {
  const palette = manifest.theme.palettes.find(p => p.id === theme?.palette) ?? manifest.theme.palettes[0]!
  const fonts = manifest.theme.fonts.find(f => f.id === theme?.fonts) ?? manifest.theme.fonts[0]!
  const vars: Record<string, string> = {
    '--t-display': fonts.display,
    '--t-body': fonts.body,
    '--t-dw': String(fonts.weight)
  }
  for (const k of KEYS) vars[`--t-${kebab(k)}`] = triplet((palette as Record<string, string>)[k]!)
  return vars
}

/** Link de um botao: vazio = WhatsApp da loja; http = outro site; o resto, pagina do site. */
export function templateLink(link?: string | null): { kind: 'whatsapp' | 'external' | 'page', to: string } {
  const l = (link ?? '').trim()
  if (!l) return { kind: 'whatsapp', to: '' }
  if (/^https?:\/\//i.test(l) || l.startsWith('mailto:') || l.startsWith('tel:')) return { kind: 'external', to: l }
  return { kind: 'page', to: l.startsWith('/') ? l : `/${l}` }
}
