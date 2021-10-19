<template>
  <DialogHandler
    :value="value"
    :title="title"
    :ok-button="okButton"
    :cancel-button="cancelButton"
    @input="$emit('input', $event)"
    @clicked:ok="_confirm"
    @clicked:cancel="_cancel"
  >
    <!-- <v-icon class="icon-dialog" color="error" size="80">mdi-close-circle</v-icon> -->
    <div class="text-h5 font-weight-bold mt-0 mb-4">{{ title }}</div>
    <p>
      {{ message }}
    </p>
  </DialogHandler>
</template>

<script>
// import DrawerDialogHandler from '@/components/Common/DrawerDialogHandler'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    // loading: {
    // 	type: Boolean,
    // 	default: false,
    // },
    // title: {
    // 	type: String,
    // 	default: 'Clear tamper',
    // },
    // responseTitle: {
    // 	type: String,
    // 	default: '',
    // },
    // response: {
    // 	type: String,
    // 	default: '',
    // },
  },

  data() {
    return {
      // Parameters that change depending on the type of dialogue
      title: undefined,
      message: undefined, // Main text content
      okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
      cancelButton: 'Go Back', // text for cancel button

      // Private variables
      resolvePromise: undefined,
      rejectPromise: undefined,
    }
  },

  methods: {
    show(opts = {}) {
      this.title = opts.title
      this.message = opts.message
      this.okButton = opts.okButton
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton
      }
      // Once we set our config, we tell the popup modal to open
      this.$emit('input', true)

      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.$emit('input', false)
      this.resolvePromise(true)
    },

    _cancel() {
      this.$emit('input', false)
      this.resolvePromise(false)
      // Or you can throw an error
      // this.rejectPromise(new Error('User cancelled the dialogue'))
    },
  },
}
</script>

<style lang="scss" scoped></style>
