<script setup lang="ts">
const props = defineProps({
  callBackErrorPhoto: {
    type: Function,
    default: () => {},
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

const imageFile = ref<File>();
const isErrorPhoto = ref<Boolean>(false);
const isCorrectPhotoSizes = ref<Boolean>(false);
const errorsMessagePhoto = ref<String[]>([]);
const sizeInMB = ref<Number>();
const setItems = (file: FileList) => {
  if (file) {
    imageFile.value = file[0];
    emit('update:modelValue', imageFile.value);

    sizeInMB.value = +(imageFile.value.size / (1024 * 1024)).toFixed(2);

    const img = new Image();
    img.src = window.URL.createObjectURL(imageFile.value);
    img.onload = () => {
      if (img.width < 70 || img.height < 70) {
        isCorrectPhotoSizes.value = false;
        customValidatePhotoSizes();
      } else {
        isCorrectPhotoSizes.value = true;
        customValidatePhotoSizes();
      }
    };
  }
};

const customValidatePhotoSizes = () => {
  if (props.callBackErrorPhoto) {
    isErrorPhoto.value = false;
    errorsMessagePhoto.value = [];
    props.callBackErrorPhoto(false);
    if (!isCorrectPhotoSizes.value) {
      isErrorPhoto.value = true;
      props.callBackErrorPhoto(true);
      errorsMessagePhoto.value.push('The photo should have a size of 70x70px');
    } else if (sizeInMB.value && sizeInMB.value > 5) {
      isErrorPhoto.value = true;
      props.callBackErrorPhoto(true);
      errorsMessagePhoto.value.push('The photo should not exceed 5 MB');
    }
  }
};
</script>

<template>
  <label class="input-file" :class="{ _error: isErrorPhoto || error }">
    <input
      class="input-file__input"
      type="file"
      accept="image/jpeg, image/jpg"
      @change="setItems($event.target.files)"
    />
    <span class="input-file__wrap">
      <span class="input-file__left">Upload</span>
      <span class="input-file__right"
        ><span>{{ imageFile ? `${imageFile.name}` : 'Upload your photo' }}</span></span
      >
    </span>
    <span v-for="(item, idx) of errorsMessagePhoto" :key="idx" class="input-file__errors">
      <span>{{ item }}</span>
    </span>
    <span v-for="item of errors" :key="item.$uid" class="input-file__errors">
      <span>{{ item.$message }}</span>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.input-file {
  cursor: pointer;

  &__wrap {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__input {
    display: none;
  }

  &__left,
  &__right {
    min-height: 5.4rem;
    padding: 1rem 1.4rem;
  }

  &__left {
    display: flex;
    align-items: center;
    border-radius: 0.4rem 0 0 0.4rem;
    border: 1px solid var(--color-black);
  }

  &__right {
    position: relative;
    border-radius: 0 0.4rem 0.4rem 0;
    border: 1px solid var(--color-gray);
    width: 100%;

    span {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      padding: 0 1.4rem;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      border-left: none;
    }
  }

  &._error {
    .input-file {
      &__left,
      &__right {
        border-color: var(--color-red);
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
