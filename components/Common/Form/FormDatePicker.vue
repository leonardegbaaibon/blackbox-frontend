<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    :name="label"
    :rules="rules"
    mode="aggressive"
  >
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="value"
      persistent
      width="290px"
    >
      <template #activator="{ on, attrs }">
        <div>
          <div v-show="label" class="mb-1 d-flex">
            <p class="mb-0 text-uppercase text--black font-weight-bold">
              {{ label }}
            </p>
          </div>
          <v-text-field
            :value="value"
            :error-messages="errors"
            outlined
            single-line
            dense
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </div>
      </template>
      <v-date-picker
        :value="value"
        :max="max"
        :min="min"
        scrollable
        @change="$emit('input', $event)"
      >
        <v-spacer></v-spacer>
        <!-- <v-btn text color="primary" @click="modal = false">Cancel</v-btn> -->
        <v-btn text color="primary" @click="$refs.dialog.save(value)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
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
      type: String,
      default: '',
    },

    rules: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: 'Date',
    },

    min: {
      type: String,
      default: '',
    },

    max: {
      type: String,
      default: '',
    },

    range: {
      type: Boolean,
      default: false,
    },
    // hideDetails: {
    //   type: [String, Boolean],
    //   default: 'auto',
    // },
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
