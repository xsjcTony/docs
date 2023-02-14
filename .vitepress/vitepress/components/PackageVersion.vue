<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue'


interface PackageVersionProps {
  name: string
  tag?: string
}


const props = defineProps<PackageVersionProps>()

const version = ref<string>()

onMounted(async () => {
  const res = await fetch(`https://registry.npmjs.org/${props.name}/${props.tag ?? 'latest'}`)
  const data = await res.json()

  version.value = data.version
})
</script>

<template>
  <VPBadge type="tip" :text="`v${version}`" v-if="version" />
</template>
