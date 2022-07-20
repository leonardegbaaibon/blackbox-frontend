<template>
  <v-dialog
    persistent
    :value="value"
    :max-width="width"
    :fullscreen="fullscreen"
    scrollable
    transition="dialog-bottom-transition"
    @input.stop="$emit('input', $event)"
  >
    <v-overlay opacity="0.7" absolute color="white" :value="loading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-card>
      <v-card-title class="pt-5">
        <p
          v-if="title"
          class="primary--text text-h4 font-weight-bold mb-1 text-left"
        >
          {{ title }}
        </p>
      </v-card-title>
      <v-card-subtitle>
        <p v-if="subtitle" class="text-h6">{{ subtitle }}</p>
      </v-card-subtitle>
      <v-card-text class="pt-4">
        <slot>defaultContent</slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="cancelDisabled" depressed class="" @click="cancel">
          {{ cancelButton }}
        </v-btn>
        <v-btn v-if="okDisabled" color="primary" depressed @click="ok">
          {{ okButton }}
        </v-btn>
        <!-- <v-spacer></v-spacer> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Create',
    },
    subtitle: {
      type: String,
      default: '',
    },
    okButton: {
      type: String,
      default: 'Ok',
    },
    cancelButton: {
      type: String,
      default: 'Cancel',
    },
    extraButton: {
      type: String,
      default: 'Extra',
    },
    okDisabled: {
      type: Boolean,
      default: true,
    },
    cancelDisabled: {
      type: Boolean,
      default: true,
    },
    extraDisabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '800px',
    },
  },
  data() {
    return {}
  },
  methods: {
    ok(evt) {
      this.$emit('clicked:ok')
    },
    cancel() {
      this.$emit('clicked:cancel')
    },
    extra() {
      this.$emit('clicked:extra')
    },
  },
}
</script>

<style lang="scss" scoped></style>
