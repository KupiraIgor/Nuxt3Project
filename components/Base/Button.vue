<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'button',
  },
});
const emit = defineEmits(['click']);
</script>

<template>
  <button class="base-button" :type="type" @click="emit('click')"><slot /></button>
</template>

<style lang="scss" scoped>
.base-button {
  background: var(--color-primary);
  min-width: 10rem;
  min-height: 3.4rem;
  border-radius: 8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem 1.8rem;
}
</style>
