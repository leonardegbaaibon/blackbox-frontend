<template>
  <DialogHandler
    :title="formTitle"
    subtitle="Enter driver and guarantor's details to create one"
    :value="value"
    :loading="loading"
    :ok-button="formTitle"
    :ok-disabled="editedIndex === -1 ? true : false"
    @input="$emit('input', $event)"
    @clicked:ok="submit"
    @clicked:cancel="$emit('input', false)"
  >
    <ValidationObserver ref="observer">
      <v-form>
        <!-- Driver's Information -->
        <p class="primary--text text-overline font-weight-bold text-center">
          Driver's Information
        </p>
        <FormInput
          v-model="form.driverName"
          label="Driver Name *"
          rules="required"
          type="text"
        />
        <v-row>
          <v-col class="pb-0">
            <FormInput
              v-model="form.driverPhoneNumber[0]"
              label="Driver Phone Number *"
              rules="required|digits:11"
              type="tel"
            />
          </v-col>
          <!-- <v-col class="pb-0">
            <FormInput
              v-model="form.driverPhoneNumber[1]"
              label="Driver Alternate Phone Number"
              rules="digits:11"
              type="tel"
            />
          </v-col> -->
        </v-row>
        <v-row>
          <v-col>
            <FormInput
              v-model="form.driverNin"
              label="Driver NIN *"
              rules="required|digits:11"
              type="text"
            />
          </v-col>
          <v-col>
            <FormInput
              v-model="form.driverLicenseNumber"
              label="Driver License Number *"
              rules="required"
              type="text"
            />
          </v-col>
        </v-row>
        <FormInput
          v-model="form.driverAddress"
          label="Driver Address *"
          rules="required"
          type="text"
        />
        <FormInput
          v-model="form.driverEmail"
          label="Driver Email *"
          rules="email"
          type="text"
        />
        <FormDatePicker
          v-model="form.driverLicenseExpiryDate"
          rules="required"
          label="Driver License Expiry Date *"
        />

        <!-- Guarantor's Information -->
        <!-- <p
          class="primary--text mt-5 text-overline font-weight-bold text-center"
        >
          Guarantor's Information
        </p>
        <FormInput
          v-model="form.driverQuarantor"
          label="Guarantor Name *"
          rules="required"
          type="text"
        />
        <FormInput
          v-if="editedIndex !== -1"
          v-model="form.driverQuarantorAddress"
          label="Guarantor Address *"
          rules="required"
          type="text"
        />
        <FormInput
          v-model="form.driverQuarantorEmail"
          label="Guarantor Email"
          rules="email"
          type="text"
        />
        <v-row>
          <v-col class="pb-0">
            <FormInput
              v-model="form.driverQuarantorPhoneNumber[0]"
              label="Guarantor Phone Number *"
              rules="required|digits:11"
              type="tel"
            />
          </v-col>
        </v-row> -->
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
      return this.editedIndex === -1 ? 'Create Driver' : 'Edit Driver'
    },
  },

  watch: {
    model: {
      // immediate: true,
      handler(newValue, oldValue) {
        this.form = {
          ...this.form,
          ...newValue,
          driverLicenseExpiryDate: newValue.driverLicenseExpiryDate
            ? this.$dayjs(newValue.driverLicenseExpiryDate).format('YYYY-MM-DD')
            : '',
          driverPhoneNumber: [
            typeof newValue.driverPhoneNumber === 'object'
              ? newValue.driverPhoneNumber[0]
              : newValue.driverPhoneNumber,
            '',
          ],
          driverPhoto: [newValue.driverPhoto],
          driverQuarantorPhoneNumber: [
            typeof newValue.driverQuarantorPhoneNumber === 'object'
              ? newValue.driverQuarantorPhoneNumber[0]
              : newValue.driverQuarantorPhoneNumber,
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
        // edit driver
        this.$refs.observer.validate().then((success) => {
          if (success) {
            const { updatedAt, createdAt, driverId, ...rest } = this.form
            const updatedPayload = {
              id: this.model.driverId,
              payload: {
                ...rest,
                driverLicenseExpiryDate: this.$dayjs(
                  rest.driverLicenseExpiryDate
                ).toISOString(),
              },
            }
            this.$emit('clicked:edit', updatedPayload)
          }
        })
      } else {
        // create driver
        this.$refs.observer.validate().then((success) => {
          if (success) {
            const payload = {
              ...this.form,
              driverLicenseExpiryDate: this.$dayjs(
                this.form.driverLicenseExpiryDate
              ).toISOString(),
              driverPhoneNumber: this.form.driverPhoneNumber.filter((x) => x),
              driverQuarantorPhoneNumber:
                this.form.driverQuarantorPhoneNumber.filter((x) => x),
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
