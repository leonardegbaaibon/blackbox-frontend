<template>
  <CardAuth :disabled="loading" title="Log into BlackBox">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form
        @submit.prevent="
          handleSubmit(() => {
            $emit('submit', { ...form })
          })
        "
      >
        <FormInput
          v-model="form.email"
          label="Email"
          rules="required|email"
          type="email"
        />
        <FormInput
          v-model="form.password"
          label="Password"
          rules="required"
          type="password"
        >
          <template #label2>
            <NuxtLink to="/reset-password">Forgot Password?</NuxtLink>
          </template>
        </FormInput>
        <FormButton block :loading="loading" type="submit">Login</FormButton>
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
      form: {
        email:
          process.env.NODE_ENV === 'development'
            ? 'insurancecare@axamansard.com'
            : '',
        password:
          process.env.NODE_ENV === 'development' ? 'axamansard@2022' : '',
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
