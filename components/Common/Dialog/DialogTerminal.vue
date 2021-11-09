<template>
  <DialogHandler
    :title="formTitle"
    subtitle="Enter terminal's details to create one"
    :loading="loading"
    :value="value"
    :ok-button="formTitle"
    :ok-disabled="editedIndex === -1 ? true : false"
    @input="$emit('input', $event)"
    @clicked:ok="submit"
    @clicked:cancel="$emit('input', false)"
  >
    <ValidationObserver ref="observer">
      <v-form>
        <!-- Terminal's Information -->
        <p class="primary--text text-overline font-weight-bold text-center">
          Terminal's Information
        </p>
        <FormInput
          v-model="form.terminalName"
          label="Terminal Name *"
          rules="required"
          type="text"
        />
        <v-row>
          <v-col>
            <FormInput
              v-model="form.terminalAddress"
              label="Terminal Address *"
              rules="required"
              type="text"
            />
          </v-col>
          <v-col>
            <FormInput
              v-model="form.terminalState"
              label="Terminal State *"
              rules="required"
              type="text"
            />
          </v-col>
        </v-row>

        <!-- Terminal Manager's Information -->
        <p
          class="primary--text mt-5 text-overline font-weight-bold text-center"
        >
          Terminal Manager's Information
        </p>
        <FormInput
          v-model="form.terminalManager"
          label="Terminal Manager's Name *"
          rules="required"
          type="text"
        />
        <FormInput
          v-model="form.terminalEmail"
          label="Terminal Email"
          rules="email"
          type="text"
        />
        <v-row>
          <v-col class="pb-0">
            <FormInput
              v-model="form.terminalPhoneNumber[0]"
              label="Terminal Phone Number *"
              rules="required|digits:11"
              type="tel"
            />
          </v-col>
          <!-- <v-col class="pb-0">
            <FormInput
              v-model="form.terminalPhoneNumber[1]"
              label="Terminal Alternate Phone Number"
              rules="digits:11"
              type="tel"
            />
          </v-col> -->
        </v-row>
      </v-form>
    </ValidationObserver>
  </DialogHandler>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
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
    editedIndex: {
      type: Number,
      default: -1,
    },
    model: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      form: {},
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Create Terminal' : 'Edit Terminal'
    },
  },

  watch: {
    model: {
      // immediate: true,
      handler(newValue, oldValue) {
        this.form = {
          ...this.form,
          ...newValue,
          terminalPhoneNumber: [
            typeof newValue.terminalPhoneNumber === 'object'
              ? newValue.terminalPhoneNumber[0]
              : newValue.terminalPhoneNumber,
            '',
          ],
        }
      },
    },
  },

  created() {
    this.form = Object.assign({}, this.model)
  },

  methods: {
    submit() {
      if (this.editedIndex !== -1) {
        // edit terminal
        this.$refs.observer.validate().then((success) => {
          if (success) {
            const { updatedAt, createdAt, ...rest } = this.form
            const updatedPayload = {
              id: this.model.terminalId,
              payload: { ...rest },
            }
            this.$emit('clicked:edit', updatedPayload)
          }
        })
      } else {
        // create terminal
        this.$refs.observer.validate().then((success) => {
          if (success) {
            const payload = {
              ...this.form,
              terminalPhoneNumber: this.form.terminalPhoneNumber.filter(
                (x) => x
              ),
            }
            this.$emit('clicked:ok', payload)
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
