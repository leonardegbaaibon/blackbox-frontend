<template>
  <DialogHandler
    title="Create Driver"
    subtitle="Enter driver and guarantor's details to create one"
    :value="value"
    :loading="loading"
    :ok-button="'Create Driver'"
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
          <v-col class="pb-0">
            <FormInput
              v-model="form.driverPhoneNumber[1]"
              label="Driver Alternate Phone Number"
              rules="digits:11"
              type="tel"
            />
          </v-col>
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
        <p
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
          <v-col class="pb-0">
            <FormInput
              v-model="form.driverQuarantorPhoneNumber[1]"
              label="Guarantor Alternate Phone Number"
              rules="digits:11"
              type="tel"
            />
          </v-col>
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
  },

  data() {
    return {
      form: {
        driverName: '',
        driverNin: '',
        driverEmail: '',
        driverLicenseNumber: '',
        driverLicenseExpiryDate: '',
        driverAddress: '',
        // to turn to array
        driverPhoneNumber: ['', ''],
        driverPhoto: [''],
        driverQuarantorPhoneNumber: ['', ''],
        // guarantor info
        driverQuarantor: '',
        driverQuarantorEmail: '',
      },
    }
  },

  methods: {
    submit() {
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
    },
  },
}
</script>

<style lang="scss" scoped></style>
