<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, alpha, helpers } from '@vuelidate/validators';
import type { Positions, ResUser, User } from '~/stores/types';
const storeUsers = useUsersStore();

const { data: positions } = await useFetch<Positions>(
  'https://frontend-test-assignment-api.abz.agency/api/v1/positions',
);

const isLoading = ref<boolean>(false);
const isSent = ref<boolean>(false);
const isErrorPhoto = ref<boolean>(false);
const responseError = ref<string>('');
const phoneData = ref<string>('');
const emailData = ref<string>('');

const formData = ref<User>({
  name: '',
  email: '',
  phone: '',
  position_id: 1,
  photo: '',
});

watch(phoneData, () => {
  formData.value.phone = phoneData.value.replace(/[^+\d]/g, '');
});

watch(emailData, () => {
  formData.value.email = emailData.value.toLowerCase();
});

watch(formData.value, () => {
  if (responseError.value) {
    responseError.value = '';
  }
});

const callBackErrorPhoto = (e: boolean) => {
  isErrorPhoto.value = e;
};

const emailRegex = helpers.regex(
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
);
const phoneRegex = helpers.regex(/^[+]{0,1}380([0-9]{9})$/);

const rules = {
  name: { required, minLength: minLength(2), maxLength: maxLength(60), alpha },
  email: {
    required,
    minLength: minLength(2),
    maxLength: maxLength(100),
    emailRegex: helpers.withMessage('Value is not a valid email address', emailRegex),
  },
  phone: { required, phoneRegex: helpers.withMessage('Value is not a valid phone', phoneRegex) },
  photo: { required },
};

const v$ = useVuelidate<any>(rules, formData);
const onSubmitForm = async () => {
  isLoading.value = true;
  const result = await v$.value.$validate();

  if (result && !isErrorPhoto.value) {
    const response: ResUser = await storeUsers.sendUser(formData.value);

    if (response.success) {
      isSent.value = true;
    } else {
      responseError.value = response.message;
    }
  }
  isLoading.value = false;
};
</script>

<template>
  <section id="post-section" class="post-section">
    <Transition>
      <BaseLoader v-show="isLoading" />
    </Transition>
    <div class="container">
      <div class="post-section__body">
        <template v-if="!isSent">
          <h2 class="post-section__title title">Working with POST request</h2>
          <form class="post-section__form" @submit.prevent="onSubmitForm">
            <BaseInput
              v-model="formData.name"
              class="post-section__input"
              placeholder="Your name"
              :error="v$.name.$errors.length"
              :errors="v$.name.$errors"
            />
            <BaseInput
              v-model="emailData"
              class="post-section__input"
              placeholder="Email"
              inputmode="email"
              :error="v$.email.$errors.length"
              :errors="v$.email.$errors"
            />
            <BaseInput
              v-model="phoneData"
              class="post-section__phone"
              inputmode="numeric"
              type="number"
              placeholder="Phone"
              phone
              :error="v$.phone.$errors.length"
              :errors="v$.phone.$errors"
            />
            <div class="post-section__position">
              <p class="post-section__position-title">Select your position</p>
              <BaseInputRadio
                v-for="pos of positions.positions"
                :key="pos.id"
                v-model="formData.position_id"
                :data="pos"
                class="post-section__radio"
              />
            </div>
            <BaseInputFile
              v-model="formData.photo"
              class="post-section__photo"
              :call-back-error-photo="callBackErrorPhoto"
              :error="v$.photo.$errors.length"
              :errors="v$.photo.$errors"
            />
            <span v-if="responseError" class="post-section__global-error">{{ responseError }}</span>
            <div class="post-section__btn">
              <BaseButton type="submit">Sign up</BaseButton>
            </div>
          </form>
        </template>
        <div v-show="isSent">
          <h2 class="post-section__title title">User successfully registered</h2>
          <img src="/success-form.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.post-section {
  padding: 7rem 0 15rem;
  position: relative;

  &__title {
    margin-bottom: 5rem;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 38rem;
    width: 100%;
  }

  &__input {
    margin-bottom: 5rem;
  }

  &__phone {
    margin-bottom: 2rem;
  }

  &__position {
    margin-bottom: 4.5rem;

    &-title {
      margin-bottom: 1rem;
    }
  }

  &__radio {
    margin-bottom: 0.8rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__photo {
    margin-bottom: 2.5rem;
  }

  &__global-error {
    color: var(--color-red);
  }

  &__btn {
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
  }
}
</style>
