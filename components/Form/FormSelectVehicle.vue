<template>
  <div>
    <div v-show="label" class="mb-1 d-flex">
      <p class="mb-0 text-uppercase text--black font-weight-bold text-caption">
        {{ label }}
      </p>
      <v-spacer></v-spacer>
      <div class="text-caption">
        <slot name="label2"></slot>
      </div>
    </div>
    <v-autocomplete
      v-model="dValue"
      single-line
      label="Select Vehicles to see trip"
      chips
      outlined
      :items="items"
      item-text="name"
      item-value="name"
      return-object
      @change="change"
    >
      <template #selection="{ item }">
        <v-chip>
          {{ item.vehicleMake }}
          {{ item.vehicleModel }} - {{ item.chauffeur?.driverName }} -
          {{ item.device?.name }}
        </v-chip>
      </template>
      <template #item="{ item }">
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ item.vehicleMake }} {{ `${item.vehicleModel}` }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ `${item.vehicleRegistrationNumber}` }} -
            {{ item.device?.name }} -{{ item.chauffeur?.driverName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      default: '',
    },
    // items: {
    //   type: Array,
    //   default: () => [
    //     {
    //       vehicleMake: '',
    //       vehicleId: '',
    //       vehicleModel: '',
    //       vehicleYear: '',
    //       vehicleColor: '',
    //     },
    //   ],
    // },
  },
  data() {
    return {
      dValue: null,
      items: [],
    }
  },

  async fetch() {
    const { data } = await this.getVehicles()
    this.items = data
    this.change(data[0])
    this.dValue = data[0]
  },

  computed: {
    ...mapState({
      vehicles: (state) => state.vehicles.all,
    }),
  },

  methods: {
    ...mapActions({
      getVehicles: 'vehicles/getVehicles',
    }),
    change(evt) {
      this.$emit('change', evt)
    },
  },
}
</script>

<style lang="scss" scoped></style>
