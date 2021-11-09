<template>
  <v-card>
    <v-card-text class="text-center px-10 py-6">
      <v-icon class="mb-1" color="success" size="72">
        mdi-checkbox-marked
      </v-icon>
      <p class="text-h5 font-weight-bold mb-3">Success!</p>
      <p class="mb-4">
        {{ message }}
      </p>
      <FormButton v-if="buttonText" block @click.native="$emit('clicked')">
        {{ buttonText }}
      </FormButton>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default:
        'Thanks! Your account has been successfully created. Please check your inbox to verify your account',
    },
    buttonText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
