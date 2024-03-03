<script setup lang="ts">
import type { IPosition } from '~/models/IPosition';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  data: {
    type: Object as () => IPosition,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get(): any {
    return props.modelValue;
  },
  set(e: number) {
    emit('update:modelValue', e);
  },
});
</script>

<template>
  <label class="input-radio">
    <input
      v-model="localValue"
      type="radio"
      :checked="localValue === data.id"
      :value="data.id"
      class="input-radio__input"
    />
    <span class="input-radio__fake"></span>
    {{ data.name }}
  </label>
</template>

<style lang="scss" scoped>
.input-radio {
  display: flex;
  align-items: center;
  cursor: pointer;

  &__input {
    display: none;
  }

  input:checked ~ .input-radio__fake {
    border: 1px solid #00bdd3;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: #00bdd3;
    }
  }

  &__fake {
    position: relative;
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid var(--color-gray);
    margin-right: 1.2rem;
  }
}
</style>
