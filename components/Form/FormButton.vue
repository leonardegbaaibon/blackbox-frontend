<template>
  <v-btn
    v-bind="$attrs"
    depressed
    :color="color"
    :disabled="disabled"
    :loading="loading"
    :type="type"
    :block="block"
    :to="to"
    :dark="dark"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    type: {
      type: String,
      default: '',
    },
    // size: {
    //   type: String,
    //   default: '',
    // },
    to: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
