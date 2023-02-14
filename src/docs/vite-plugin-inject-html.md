---
outline: [2, 3]
---


# vite-plugin-inject-html <Badge type="tip" text="v1.0.3" />

[View on GitHub](https://github.com/xsjcTony/vite-plugin-inject-html)




## Install

- `Node.js` >= 14.18.0
- `Vite` >= 2.0.0

```bash
pnpm add -D vite-plugin-inject-html
```



## Basic usage

```ts {7-9}
// vite.config.ts
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({
      // ...options
    }),
    // ...otherPlugins
  ]
})
```




## Available Options

- [`favicon`](#favicon) - favicon url
- [`title`](#title) - title
- [`metas`](#metas) - `<meta>` tags
- [`links`](#links) - `<link>` tags
- [`externalStyleSheets`](#externalStyleSheets) - external style sheet urls
- [`scripts`](#scripts) - `<script>` tags
- [`noscripts`](#noscripts) - `<noscript>` tags
- [`otherTags`](#otherTags) - other tags or customizing `injectTo`




### favicon

- inject `<link rel="icon" href="..." />`

- Type Declaration

```ts
interface PluginOptions {
  favicon?: string
}
```

- usage

```ts
injectHTMLPlugin({
  favicon: 'https://example.com/favicon.ico' 
})
```

::: details Full example with output

- input

```ts
// vite.config.ts // [!code focus]
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({ // [!code focus:3]
      favicon: 'https://example.com/favicon.ico'
    })
  ]
})
```

- output

```html
<!-- index.html -->
<head>
  <link rel="icon" href="https://example.com/favicon.ico" />
</head>
```

:::




### title

- inject `<title>...</title>`
- It will replace the existing `<title>` tag

- Type Declaration

```ts
interface PluginOptions {
  title?: string
}
```

- usage

```ts
injectHTMLPlugin({
  title: 'My App'
})
```
::: details Full example with output

- input

```ts
// vite.config.ts // [!code focus]
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({ // [!code focus:3]
      title: 'My App'
    })
  ]
})
```

- output

```html
<!-- index.html -->
<head>
  <title>My App</title>
</head>
```

:::



### metas

- inject `<meta ... />` tags

- Type Declaration

```ts {3-5}
type TagAttributes = Record<string, boolean | string>

interface PluginOptions {
  metas?: TagAttributes[]
}
```

- usage

```ts
injectHTMLPlugin({
  metas: [
    {
      name: 'description',
      content: 'My App'
    }
  ]
})
```

::: details Full example with output

- input

```ts
// vite.config.ts // [!code focus]
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({ // [!code focus:8]
      metas: [
        {
          name: 'description',
          content: 'My App'
        }
      ]
    })
  ]
})
```

- output

```html
<!-- index.html -->
<head>
  <meta name="description" content="My App" />
</head>
```

:::




### links

- inject `<link ... />` tags

- Type Declaration

```ts {3-5}
type TagAttributes = Record<string, boolean | string>

interface PluginOptions {
  links?: TagAttributes[]
}
```

- usage

```ts
injectHTMLPlugin({
  links: [
    {
      rel: 'stylesheet',
      href: 'https://example.com/style.css'
    }
  ]
})
```

::: details Full example with output

- input

```ts
// vite.config.ts // [!code focus]
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({ // [!code focus:13]
      links: [
        {
          rel: 'stylesheet',
          href: 'https://example.com/style.css'
        },
        {
          rel: 'preload',
          as: 'image',
          href: 'https://example.com/image.png'
        }
      ]
    })
  ]
})
```

- output

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="https://example.com/style.css" />
  <link rel="preload" as="image" href="https://example.com/image.png" />
</head
```

:::






### externalStyleSheets

- inject `<link rel="stylesheet" type="text/css" href="..." />`

- Type Declaration

```ts
interface PluginOptions {
  externalStyleSheets?: string[]
}
```

- usage

```ts
injectHTMLPlugin({
  externalStyleSheets: [
    'https://example.com/style.css',
    'https://example.com/style2.css'
  ]
})
```

::: details Full example with output

- input

```ts
// vite.config.ts // [!code focus]
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({ // [!code focus:6]
      externalStyleSheets: [
        'https://example.com/style.css',
        'https://example.com/style2.css'
      ]
    })
  ]
})
```

- output

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" type="text/css" href="https://example.com/style.css" />
  <link rel="stylesheet" type="text/css" href="https://example.com/style2.css" />
</head
```

:::




### scripts

- inject `<script>` tags
- `injectTo` default to `body` if not specified

- Type Declaration

```ts {28-30}
interface HtmlTagDescriptor {
  // default: 'body'
  injectTo?: 'head' | 'body' | 'head-prepend' | 'body-prepend'
}

type TagAttributes = Record<string, boolean | string>

interface WithSrcWithoutTagName extends Pick<
  HtmlTagDescriptor, 'injectTo'
> {
  src: string
  attributes?: TagAttributes
}

interface WithStringChildrenWithoutTagName extends Pick<
  HtmlTagDescriptor, 'injectTo'
> {
  children: string
  attributes?: TagAttributes
}

type ScriptTagType = 
  | WithSrcWithoutTagName
  | WithStringChildrenWithoutTagName
  | string


interface PluginOptions {
  scripts?: ScriptTagType[]
}
```

- usage

```ts
injectHTMLPlugin({
  scripts: [
    `console.log('String Content 1')`,
    {
      children: `console.log('String Content 2')`,
      injectTo: 'head-prepend'
    },
    {
      src: 'https://example.com/script.js',
      attributes: { async: true },
      injectTo: 'body-prepend'
    }
  ]
})
```

::: details Full example with output

- input

```ts
// vite.config.ts // [!code focus]
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({ // [!code focus:14]
      scripts: [
        `console.log('String Content 1')`,
        {
          children: `console.log('String Content 2')`,
          injectTo: 'head-prepend'
        },
        {
          src: 'https://example.com/script.js',
          attributes: { async: true },
          injectTo: 'body-prepend'
        }
      ]
    })
  ]
})
```

- output

```html
<!-- index.html -->
<head>
  <script>
    console.log('String Content 2')
  </script>
</head>
<body>
  <script src="https://example.com/script.js"></script>
  <script>
    console.log('String Content 1')
  </script>
</body>
```

:::






### noscripts

- inject `<noscript>` tags
- `injectTo` default to `body` if not specified

- Type Declaration

```ts {18-20}
export declare interface HtmlTagDescriptor {
  tag: string
  attrs?: Record<string, string | boolean | undefined>
  children?: string | HtmlTagDescriptor[]
  // default: 'body'
  injectTo?: 'head' | 'body' | 'head-prepend' | 'body-prepend'
}

interface WithoutTagNameAndAttributes extends Pick<HtmlTagDescriptor, 'injectTo'> {
  children: HtmlTagDescriptor[] | string
}

type NoscriptTagType = 
  | WithoutTagNameAndAttributes
  | string


interface PluginOptions {
  noscripts?: NoscriptTagType[]
}
```

- usage

```ts
injectHTMLPlugin({
  noscripts: [
    `console.log('String Content 1')`,
    {
      children: `console.log('String Content 2')`,
      injectTo: 'body-prepend'
    }
  ]
})
```

::: details Full example with output

- input

```ts
// vite.config.ts // [!code focus]
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({ // [!code focus:9]
      noscripts: [
        `console.log('String Content 1')`,
        {
          children: `console.log('String Content 2')`,
          injectTo: 'body-prepend'
        }
      ]
    })
  ]
})
```

- output

```html
<!-- index.html -->
<body>
  <noscript>
    console.log('String Content 2')
  </noscript>
  <noscript>
    console.log('String Content 1')
  </noscript>
</body>
```

:::






### otherTags

- inject any other tags
- customize `injectTo` for options above

- Type Declaration

```ts {9-11}
interface HtmlTagDescriptor {
    tag: string
    attrs?: Record<string, string | boolean | undefined>
    children?: string | HtmlTagDescriptor[]
    // default: 'head-prepend'
    injectTo?: 'head' | 'body' | 'head-prepend' | 'body-prepend'
}

interface PluginOptions {
  otherTags?: HtmlTagDescriptor[]
}
```

- usage

```ts
injectHTMLPlugin({
  otherTags: [
    {
      tagName: 'h1',
      attrs: { id: 'title' },
      children: 'Hello World',
      injectTo: 'body'
    }
  ]
})
```

::: details Full example with output

- input

```ts
// vite.config.ts // [!code focus]
import { defineConfig } from 'vite'
import injectHTMLPlugin from 'vite-plugin-inject-html'

export default defineConfig({
  plugins: [
    injectHTMLPlugin({ // [!code focus:10]
      otherTags: [
        {
          tagName: 'h1',
          attrs: { id: 'title' },
          children: 'Hello World',
          injectTo: 'body'
        }
      ]
    })
  ]
})
```

- output

```html
<!-- index.html -->
<body>
  <h1 id="title">Hello World</h1>
</body>
```

:::
