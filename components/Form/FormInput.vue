<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    :name="name || label"
    :rules="rules"
    :mode="mode"
  >
    <div v-show="label" class="mb-1 d-flex" :for="id">
      <p class="mb-0 text-uppercase text--black font-weight-bold text-caption">
        {{ label }}
      </p>
      <v-spacer></v-spacer>
      <div class="text-caption">
        <slot name="label2"></slot>
      </div>
    </div>
    <v-text-field
      single-line
      :readonly="readonly"
      :prefix="prefix"
      :error-messages="errors"
      :value="value"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :dense="dense"
      :loading="loading"
      :append-icon="appendIcon"
      :append-inner-icon="appendInnerIcon"
      :prepend-icon="prependIcon"
      :prepend-inner-icon="prependInnerIcon"
      :clearable="clearable"
      outlined
      :hide-details="hideDetails"
      @input="$emit('input', $event)"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
  },

  model: {
    event: 'input',
    prop: 'value',
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    appendIcon: {
      type: String,
      default: '',
    },
    prependInnerIcon: {
      type: String,
      default: '',
    },
    appendInnerIcon: {
      type: String,
      default: '',
    },
    prependIcon: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    rules: {
      type: String,
      default: '',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    // plaintext: {
    //   type: Boolean,
    //   default: false,
    // },
    // formControl: {
    //   type: Boolean,
    //   default: false,
    // },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    hideDetails: {
      type: [String, Boolean],
      default: false,
    },
    prefix: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
