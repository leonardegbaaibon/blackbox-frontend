<template>
  <DialogHandler
    :title="title"
    :subtitle="subtitle"
    :loading="loading"
    :value="value"
    :ok-button="title"
    @input="$emit('input', $event)"
    @clicked:ok="submit"
    @clicked:cancel="$emit('input', false)"
  >
    <p class="text-h5 mb-1">2 days to fix</p>
    <p class="">Get required spare part from vendors</p>
    <p class="mt-5 mb-0 overline font-weight-bold">Suggestions</p>
    <v-list dense>
      <v-list-item
        v-for="spare in spares"
        :key="spare.name"
        class="d-flex justify-space-between align-center"
      >
        <p class="mb-0">{{ spare.name }}</p>
        <div class="d-flex align-center">
          <v-rating
            background-color="grey"
            color="warning"
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            length="5"
            readonly
            size="24"
            :value="spare.rating"
          ></v-rating>
          ({{ spare.rating }})
        </div>
      </v-list-item>
    </v-list>
  </DialogHandler>
</template>

<script>
// import { ValidationObserver } from 'vee-validate'
export default {
  components: {
    // ValidationObserver,
  },

  model: {
    event: 'input',
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    terminal: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      spares: [
        { name: 'Auto Spare Parts And Accessories', rating: 4.4 },
        { name: 'Hyundai Genuine Spares Part', rating: 3.6 },
        { name: 'Hazael Investment Limited', rating: 2.9 },
      ],
    }
  },

  methods: {
    // submit() {
    //   if (this.editedIndex !== -1) {
    //     // edit terminal
    //     this.$refs.observer.validate().then((success) => {
    //       if (success) {
    //         const { updatedAt, createdAt, ...rest } = this.form
    //         const updatedPayload = {
    //           id: this.model.terminalId,
    //           payload: { ...rest },
    //         }
    //         this.$emit('clicked:edit', updatedPayload)
    //       }
    //     })
    //   } else {
    //     // create terminal
    //     this.$refs.observer.validate().then((success) => {
    //       if (success) {
    //         const payload = {
    //           ...this.form,
    //           terminalPhoneNumber: this.form.terminalPhoneNumber.filter(
    //             (x) => x
    //           ),
    //         }
    //         this.$emit('clicked:ok', payload)
    //       }
    //     })
    //   }
    // },

    submit() {
      this.$emit('clicked:ok', this.form)
    },
  },
}
</script>

<style lang="scss" scoped></style>
