import { defineConfig } from 'vitepress'


export default defineConfig({
  outDir: './dist',
  srcDir: './src',
  lastUpdated: true,

  lang: 'en-US',
  title: `Aelita`,
  titleTemplate: `:title | Aelita`,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-with-shadow.svg' }],
  ],
  description: `All-in-one documentation for all of Aelita's open-source libraries.`,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Documentations', link: '/docs/', activeMatch: '/docs/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xsjcTony' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/xsjctony/' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCYVhIP1-wyBqLo5TK_jhlNg' }
    ],
    footer: {
      message: 'Enjoy 😊 - <a href="mailto:xsjcTony@gmail.com" style="text-decoration: underline;">Contact me 📧</a>',
      copyright: 'Copyright © 2023-present Aelita (Tony Jiang)'
    },
    sidebar: {
      '/docs/': [
        {
          text: 'Overview',
          items: [
            {
              text: 'Getting Started',
              link: '/docs/'
            }
          ]
        },
        {
          text: 'Documentations',
          items: [
            {
              text: 'vite-plugin-inject-html',
              link: '/docs/vite-plugin-inject-html'
            }
          ]
        }
      ]
    }
  }
})
