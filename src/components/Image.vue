<template>
  <InlineSvg v-if="src.includes('.svg')" :src="src" @error="onError"></InlineSvg>
  <img v-else :src="src" :alt="alt" @error="onError" />
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
  },

  defaultSrc: {
    type: String,
    default: '',
  },
})

function onError(e) {
  if (props.defaultSrc) {
    e.target.src = props.defaultSrc
  }
}
</script>

<style>
svg path:not([fill]):not([class]),
svg rect:not([fill]):not([class]),
svg g:not([fill]):not([class]),
svg circle:not([fill]):not([class]),
svg ellipse:not([fill]):not([class]) {
  fill: currentColor;
}
</style>