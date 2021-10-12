export default {
  methods: {
    makeToast({
      title,
      message,
      variant,
      append = true,
      toaster = 'b-toaster-top-right',
    }) {
      this.$bvToast.toast(`${message}`, {
        title,
        toaster,
        variant,
        solid: true,
        autoHideDelay: 3000,
        appendToast: append,
      })
    },
  },
}
