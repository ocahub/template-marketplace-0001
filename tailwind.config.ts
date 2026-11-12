/**
 * As cores do template vem da aparencia escolhida no painel (variaveis --t-*, em
 * "R G B", pelo layout): bg-moss, text-clay, bg-moss-dark/95...
 */
const c = (name: string) => `rgb(var(--t-${name}) / <alpha-value>)`
export default {
  content: ['./app/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        moss: { DEFAULT: c('moss'), dark: c('moss-dark'), light: c('moss-light') },
        clay: { DEFAULT: c('clay'), dark: c('clay-dark') },
        ember: c('ember'),
        slate2: c('slate'),
        cream: c('cream'),
        sand: c('sand'),
        blush: c('blush'),
        ink: { DEFAULT: c('ink'), 2: c('ink2') },
        muted: c('muted')
      },
      fontFamily: { sans: ['var(--t-body)'], display: ['var(--t-display)'] }
    }
  }
}
