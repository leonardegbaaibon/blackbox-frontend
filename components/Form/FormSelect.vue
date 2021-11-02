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
    <v-select
      :items="items"
      single-line
      :readonly="readonly"
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
      @change="$emit('input', $event)"
    >
      <template #selection="{ item }">
        <v-avatar :class="[item.color]" size="16" class="mr-4"></v-avatar>
        {{ item.text }}
      </template>
      de
      <template #item="{ item }">
        <v-list-item-avatar size="24">
          <v-icon :class="[item.color]" dark small>mdi-palette</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </v-select>
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
    items: {
      type: Array,
      default: () => [],
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
  },
}
</script>

<style lang="scss" scoped></style>
