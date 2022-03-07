<template>
  <DialogHandler
    :title="title"
    subtitle="Enter vehicle and vehicle owner's details to create one"
    :value="value"
    :ok-button="title"
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
              rules="required|numeric|digits:4"
              type="text"
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
        <!-- <FormSelect v-model="form.color" label="Color *" :items="color" /> -->
        <!-- END color picker  -->

        <!-- new color picker  -->
        <p
          class="mb-2 text-uppercase text--black font-weight-bold text-caption"
        >
          vehicle color *
        </p>
        <v-swatches v-model="color" :swatches="swatches"></v-swatches>
        <br />
        {{ colorText }}
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
// import COLORS from 'vuetify/lib/util/colors'
import VSwatches from 'vue-swatches'

export default {
  components: {
    ValidationObserver,
    VSwatches,
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
    vehicle: {
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
        model: this.vehicle?.vehicleModel || '',
        year: this.vehicle?.vehicleYear || '',
        vin: this.vehicle?.vehicleVin || '',
        color: this.vehicle?.vehicleColor || '',
        registrationNumber: this.vehicle?.vehicleRegistrationNumber || '',
        make: this.vehicle?.vehicleMake || '',
        name: this.vehicle?.vehicleName || '',
        // owner info
        vehicleOwnerAddress: this.vehicle?.vehicleOwnerAddress || '',
        vehicleOwnerPhoneNumber: this.vehicle?.vehicleOwnerPhoneNumber || '',
        vehicleOwnerName: this.vehicle?.vehicleOwnerName || '',
      },
      color: this.vehicle?.vehicleColor || '',
      swatches: [
        { color: '#A52A2A', label: 'Brown' },
        { color: '#808080', label: 'Gray' },
        { color: '#008000', label: 'Green' },
        { color: '#ffa500', label: 'Orange' },
        { color: '#ffc0cb', label: 'Pink' },
        { color: '#800080', label: 'Purple' },
        { color: '#ff0000', label: 'Red' },
        { color: '#c0c0c0', label: 'Silver' },
        { color: '#ffffff', label: 'White' },
        { color: '#ffff00', label: 'Yellow' },
        { color: '#f5f5dc', label: 'Beige' },
        { color: '#ffd700', label: 'Gold' },
        { color: '#aaa9ad', label: 'SilverMetallic' },
        { color: '#36454F', label: 'Charcoal' },
        { color: '#800020', label: 'Burgundy' },
        { color: '', label: 'Other' },
        // { color: '#F891A6', label: 'Multi' },
      ],
    }
  },

  computed: {
    // colorText() {
    //   return this.swatches.find((element) => element.color === this.color).label
    // },
  },

  // watch: {
  //   model: {
  //     // immediate: true,
  //     handler(newValue, oldValue) {
  //       if (this.editedIndex === -1) {
  //         // create
  //         this.form = {
  //           ...newValue,
  //         }
  //       } else {
  //         // edit
  //         this.form = {
  //           ...newValue,
  //         }
  //       }
  //     },
  //   },
  // },

  methods: {
    submit() {
      // if (this.editedIndex !== -1) {
      //   // edit vehicle
      //   this.$refs.observer.validate().then((success) => {
      //     if (success) {
      //       const { updatedAt, createdAt, device, ...rest } = this.form
      //       const updatedPayload = {
      //         id: this.model.vehicleId,
      //         payload: {
      //           ...rest,
      //         },
      //       }
      //       this.$emit('clicked:edit', updatedPayload)
      //     }
      //   })
      // } else {
      // create vehicle
      this.$refs.observer.validate().then((success) => {
        if (success) {
          const { color, ...form } = this.form
          this.$emit('clicked:ok', { ...form, color: this.colorText })
        }
      })
    },
  },
  // },
}
</script>

<style lang="scss" scoped></style>
