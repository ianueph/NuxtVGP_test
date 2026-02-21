<script lang="ts" setup>
defineProps<{
  title: string,
  info: string | number | Date,
}>()
</script>

<template>
    <h3> {{ title }} </h3>
    <p class="indent">{{ info }}</p>
</template>

<style>
.indent {
  padding-left: 2rem; 
  max-width: 600px;
}
</style>
