<template>
  <DialogHandler
    title="Assign Driver"
    :value="value"
    ok-button="Assign Driver"
    :loading="loading"
    @input="$emit('input', $event)"
    @clicked:ok="submit"
    @clicked:cancel="$emit('input', false)"
  >
    <ValidationObserver ref="observer">
      <v-form>
        <v-select
          v-model="form.id"
          label="Drivers"
          :items="drivers"
          outlined
          item-text="driverName"
          item-value="driverId"
        >
          <template #selection="{ item }">
            {{ item.driverName }} • {{ item.driverPhoneNumber }}
          </template>
        </v-select>
      </v-form>
    </ValidationObserver>
  </DialogHandler>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
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
    vehicle: {
      type: String,
      default: '',
    },
    // subtitle: {
    //   type: String,
    //   default: "Enter device's details to create one",
    // },
  },

  data() {
    return {
      form: {
        id: '',
      },
      drivers: [],
    }
  },

  computed: {},

  async created() {
    this.drivers = await this.getDrivers()
  },

  methods: {
    ...mapActions({
      getDrivers: 'drivers/getUnassignedDrivers',
      assignDriver: 'drivers/assignDriver',
    }),
    async submit() {
      try {
        const resp = await this.assignDriver({
          vehicleId: this.vehicle,
          driverId: this.form.id,
        })
        this.$toast.success(resp.meta.info)
        this.$emit('input', false)
        this.$emit('reload')
      } catch (error) {
        this.$toast.error(error.data.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
