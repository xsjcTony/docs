<script lang="ts" setup>
import { onMounted } from 'vue'
import { $ref } from 'vue/macros'
import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue'


interface PackageVersionProps {
  name: string
  tag?: string
}


const { name, tag = 'latest' } = defineProps<PackageVersionProps>()

let version = $ref<string>()

onMounted(async () => {
  const res = await fetch(`https://registry.npmjs.org/${name}/${tag}`)
  const data = await res.json()

  version = data.version
})
</script>

<template>
  <VPBadge type="tip" :text="`v${version}`" v-if="version" />
</template>
