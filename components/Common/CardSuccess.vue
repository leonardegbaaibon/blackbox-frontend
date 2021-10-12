<template>
  <v-card>
    <v-card-text class="text-center px-10 py-6">
      <v-icon class="mb-1" color="success" size="72">
        mdi-checkbox-marked
      </v-icon>
      <p class="text-h5 font-weight-bold mb-3">Success!</p>
      <p class="mb-4">
        Thanks! Your account has been successfully created. Please check your
        inbox to verify your account
      </p>
      <FormButton block @click.native="$emit('login')">Login</FormButton>
    </v-card-text>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
