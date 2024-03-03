<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
    required: false,
  },
  phone: {
    type: Boolean,
    required: false,
    default: false,
  },
  error: {
    type: Number,
    default: 0,
  },
  errors: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const isFocusInput = ref<Boolean>(false);

const onFocusInput = () => {
  isFocusInput.value = true;
};

const onBlurInput = () => {
  isFocusInput.value = false;
};
</script>

<template>
  <label class="base-input" :class="{ _error: error }">
    <span class="base-input__wrap">
      <span class="base-input__placeholder" :class="{ _focus: isFocusInput || modelValue }"> {{ placeholder }} </span>
      <input
        :value="modelValue"
        :type="type"
        class="base-input__input"
        @input="emit('update:modelValue', $event.target.value)"
        @focus="onFocusInput"
        @blur="onBlurInput"
      />
    </span>
    <span v-if="phone" class="base-input__phone">+38 (XXX) XXX - XX - XX</span>
    <span v-for="item of errors" :key="item.$uid" class="base-input__errors">
      <span>{{ item.$message }}</span>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.base-input {
  cursor: pointer;

  &__wrap {
    position: relative;
    display: block;
  }

  &__input {
    border-radius: 0.4rem;
    border: 1px solid var(--color-gray);
    padding: 1.3rem 1.6rem;
    min-height: 5.4rem;
    width: 100%;
    background: var(--color-bg-page);
    transition: border 0.2s ease-in-out;
  }

  &__placeholder {
    position: absolute;
    top: 1.5rem;
    left: 1.7rem;
    cursor: text;
    background-color: var(--color-bg-page);
    padding: 0 0.4rem;
    transition: 0.2s ease;

    &._focus {
      transform: translate(-0.6rem, -2.6rem) scale(0.73);
    }
  }

  &__phone {
    font-size: 1.2rem;
    color: var(--color-gray-2);
    padding-left: 1.6rem;
  }

  &._error {
    .base-input {
      &__input {
        border-color: var(--color-red);
      }

      &__placeholder {
        color: var(--color-red);
      }
    }
  }

  &__errors {
    display: block;
    padding: 0.4rem 0 0 1.6rem;
    font-size: 1.2rem;
    line-height: 1.1;
    color: var(--color-red);

    span {
      display: block;
    }
  }
}
</style>
