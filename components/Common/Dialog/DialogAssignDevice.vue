<template>
  <DialogHandler
    title="Assign Device"
    :value="value"
    ok-button="Assign Device"
    :loading="loading"
    @input="$emit('input', $event)"
    @clicked:ok="submit"
    @clicked:cancel="$emit('input', false)"
  >
    <ValidationObserver ref="observer">
      <v-form>
        <v-select
          v-model="form.id"
          label="Devices"
          :items="devices"
          outlined
          item-text="uniqueId"
          item-value="deviceId"
        >
          <template #selection="{ item }">
            {{ item.name }} • {{ item.uniqueId }}
          </template>
        </v-select>
      </v-form>
    </ValidationObserver>
  </DialogHandler>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapState } from 'vuex'
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
    }
  },

  computed: {
    ...mapState({
      devices: (state) => state.devices.all,
    }),
  },

  created() {
    this.getDevices()
  },

  methods: {
    ...mapActions({
      getDevices: 'devices/getUnassignedDevices',
      assignDevice: 'devices/assignDevice',
    }),
    async submit() {
      try {
        const resp = await this.assignDevice({
          vehicleId: this.vehicle,
          deviceId: this.form.id,
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
