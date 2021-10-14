<template>
  <CardAuth
    :disabled="loading"
    title="Recover Password"
    subtitle="Don't worry, happens to the best of us."
  >
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form
        @submit.prevent="
          handleSubmit(() => {
            $emit('submit', {
              password: form.password,
              confirmationCode: form.confirmationCode,
            })
          })
        "
      >
        <FormInput
          v-model="form.confirmationCode"
          label="Code"
          rules="required"
          type="email"
        />
        <FormInput
          v-model="form.password"
          label="Password"
          rules="required|password_check|password:@confirm"
          type="email"
        />
        <FormInput
          v-model="form.confirm"
          name="confirm"
          label="Confirm Password"
          rules="required"
          type="email"
        />
        <FormButton block :loading="loading" type="submit">
          Reset Password
        </FormButton>
        <p class="mb-0 mt-2 text-center">
          Remember now?
          <NuxtLink class="font-weight-bold" to="/">Log in</NuxtLink>
        </p>
      </v-form>
    </ValidationObserver>
  </CardAuth>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationObserver,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: { password: '', confirmationCode: '', confirm: '' },
    }
  },
}
</script>

<style lang="scss" scoped></style>
