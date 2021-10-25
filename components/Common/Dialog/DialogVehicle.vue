<template>
  <DialogHandler
    title="Create Vehicle"
    subtitle="Enter vehicle and vehicle owner's details to create one"
    :value="value"
    :ok-button="'Create Vehicle'"
    :loading="loading"
    @input="$emit('input', $event)"
    @clicked:ok="submit"
    @clicked:cancel="$emit('input', false)"
  >
    <ValidationObserver ref="observer">
      <v-form>
        <!-- Vehicle's Information -->
        <p class="primary--text text-overline font-weight-bold text-center">
          Vehicle's Information
        </p>
        <v-row>
          <v-col class="pb-0">
            <FormInput
              v-model="form.make"
              label="Make *"
              rules="required"
              type="text"
            />
          </v-col>
          <v-col class="pb-0">
            <FormInput v-model="form.name" label="Name" type="text" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <FormInput
              v-model="form.model"
              label="Model *"
              rules="required"
              type="text"
            />
          </v-col>
          <v-col>
            <FormInput
              v-model.number="form.year"
              label="Year *"
              rules="required"
              type="number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <FormInput
              v-model="form.vin"
              label="VIN *"
              rules="required"
              type="text"
            />
          </v-col>
          <v-col>
            <FormInput
              v-model="form.registrationNumber"
              label="Registration Number *"
              rules="required"
              type="text"
            />
          </v-col>
        </v-row>
        <!-- color picker  -->
        <FormSelect v-model="form.color" label="Color *" :items="colorItems" />
        <!-- END color picker  -->

        <!-- Owner's Information -->
        <p
          class="primary--text mt-5 text-overline font-weight-bold text-center"
        >
          Owner's Information
        </p>
        <v-row>
          <v-col class="pb-0">
            <FormInput
              v-model="form.vehicleOwnerName"
              label="Vehicle Owner Name *"
              rules="required"
              type="text"
            />
          </v-col>
          <v-col class="pb-0">
            <FormInput
              v-model="form.vehicleOwnerPhoneNumber"
              label="Vehicle Owner Phone Number *"
              rules="required|digits:11"
              type="tel"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <FormInput
              v-model="form.vehicleOwnerAddress"
              label="Vehicle Owner Address *"
              rules="required"
              type="text"
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
      colorItems: ['Red', 'Blue', 'Green'],
      form: {
        model: '',
        year: '',
        vin: '',
        color: '',
        registrationNumber: '',
        make: '',
        name: '',
        // owner info
        vehicleOwnerAddress: '',
        vehicleOwnerPhoneNumber: '',
        vehicleOwnerName: '',
      },
    }
  },

  methods: {
    submit() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.$emit('clicked:ok', this.form)
        }
      })
    },

    changeColor(evt) {
      console.log('🚀 ~ changeColor ~ evt', evt)
    },
  },
}
</script>

<style lang="scss" scoped></style>
