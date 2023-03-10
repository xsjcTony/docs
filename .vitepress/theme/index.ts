import defaultTheme from 'vitepress/theme'
import PackageVersion from '../vitepress/components/PackageVersion.vue'
import type { Theme } from 'vitepress'
import '@/theme/custom.css'


const theme: Theme = {
  ...defaultTheme,
  enhanceApp({ app }) {
    app.component('PackageVersion', PackageVersion)
  }
}


export default theme
