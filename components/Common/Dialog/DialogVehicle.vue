<template>
  <DialogHandler
    :title="formTitle"
    subtitle="Enter vehicle and vehicle owner's details to create one"
    :value="value"
    :ok-button="formTitle"
    :ok-disabled="editedIndex === -1 ? true : false"
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
        <FormSelect v-model="form.color" label="Color *" :items="color" />
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
import COLORS from 'vuetify/lib/util/colors'
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
      colorItems: [
        { text: 'Red', value: 'red' },
        { text: 'Green', value: 'green' },
        { text: 'Blue', value: 'blue' },
      ],
      form: {},
      // form: {
      //   model: '',
      //   year: '',
      //   vin: '',
      //   color: '',
      //   registrationNumber: '',
      //   make: '',
      //   name: '',
      //   // owner info
      //   vehicleOwnerAddress: '',
      //   vehicleOwnerPhoneNumber: '',
      //   vehicleOwnerName: '',
      // },
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Create Vehicle' : 'Edit Vehicle'
    },
    color() {
      const colorArray = Object.keys(COLORS).map((color) => ({
        text: color.charAt(0).toUpperCase() + color.slice(1),
        value: color.charAt(0).toUpperCase() + color.slice(1),
        color: color
          .split(/(?=[A-Z])/)
          .join('-')
          .toLowerCase(),
      }))
      return colorArray
    },
  },

  watch: {
    model: {
      // immediate: true,
      handler(newValue, oldValue) {
        if (this.editedIndex === -1) {
          // create
          this.form = {
            ...newValue,
          }
        } else {
          // edit
          this.form = {
            ...newValue,
          }
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
        // edit vehicle
        this.$refs.observer.validate().then((success) => {
          if (success) {
            const { updatedAt, createdAt, device, ...rest } = this.form
            const updatedPayload = {
              id: this.model.vehicleId,
              payload: {
                ...rest,
              },
            }
            this.$emit('clicked:edit', updatedPayload)
          }
        })
      } else {
        // create vehicle
        this.$refs.observer.validate().then((success) => {
          if (success) {
            this.$emit('clicked:ok', this.form)
          }
        })
      }
    },

    changeColor(evt) {
      console.log('🚀 ~ changeColor ~ evt', evt)
    },
  },
}
</script>

<style lang="scss" scoped></style>
