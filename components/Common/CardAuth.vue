<template>
  <v-card :disabled="disabled" class="pa-7" :color="color">
    <v-card-title class="text-h5 font-weight-bold text-center">
      <v-spacer></v-spacer>
      {{ title }}
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-subtitle v-show="subtitle" class="text-center">
      {{ subtitle }}
    </v-card-subtitle>

    <v-card-text class="mt-6">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title',
    },
    subtitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'white',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
