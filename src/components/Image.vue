<template>
  <InlineSvg v-if="props.src.includes('.svg')" :src="props.src"></InlineSvg>
  <img v-else :src="props.src" :alt="props.alt" />
</template>

<script setup>
import InlineSvg from 'vue-inline-svg'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },

  alt: {
    type: String,
  }
})
</script>

<style>
svg path:not([fill]),
svg rect:not([fill]),
svg g:not([fill]),
svg ellipse:not([fill]) {
  fill: currentColor;
}
</style>