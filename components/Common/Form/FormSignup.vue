<template>
  <CardAuth :disabled="loading" title="Sign up for Blackbox">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(() => $emit('submit', form))">
        <FormInput
          v-model="form.name"
          name="Your name"
          label="Name"
          rules="required"
          type="text"
        />
        <FormInput
          v-model="form.email"
          label="Email"
          rules="required|email"
          type="email"
        />
        <FormInput
          v-model="form.password"
          label="Password"
          rules="required|password_check|password:@confirm"
          type="password"
        ></FormInput>
        <FormInput
          v-model="form.confirm"
          label="Confirm Password"
          name="confirm"
          rules="required"
          type="password"
        ></FormInput>
        <FormButton block :loading="loading">Signup</FormButton>
        <p class="mb-0 mt-2 text-center">
          Already have an account?
          <a class="font-weight-bold" @click="$emit('click:switch')">Login</a>
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
      form: { name: null, email: null, password: null, confirm: null },
    }
  },
}
</script>

<style lang="scss" scoped></style>
