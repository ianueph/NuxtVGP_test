<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
declare module 'nuxt/app' {
  interface NuxtLayouts {
    'task-layout': unknown
  }
}
// ---cut---
definePageMeta({
  layout: 'task-layout',
})
</script>