<template>
  <DialogHandler
    :title="title"
    :subtitle="subtitle"
    :value="value"
    :ok-button="title"
    :loading="loading"
    @input="$emit('input', $event)"
    @clicked:ok="submit"
    @clicked:cancel="$emit('input', false)"
  >
    <ValidationObserver ref="observer">
      <v-form>
        <FormInput
          v-model="form.name"
          label="Name *"
          rules="required"
          type="text"
        />
        <FormInput
          v-model="form.uniqueId"
          label="Unique ID *"
          rules="required"
          type="text"
        />
      </v-form>
    </ValidationObserver>
  </DialogHandler>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
// console.log('🚀 ~ COLORS', COLORS)
export default {
  components: {
    ValidationObserver,
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
    loading: {
      type: Boolean,
      default: false,
    },
    device: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: 'Create',
    },
    subtitle: {
      type: String,
      default: "Enter device's details to create one",
    },
  },

  data() {
    return {
      form: {
        name: this.device?.name || '',
        uniqueId: this.device?.uniqueId || '',
      },
    }
  },

  methods: {
    submit() {
      this.$emit('clicked:ok', this.form)
    },
  },
}
</script>

<style lang="scss" scoped></style>
