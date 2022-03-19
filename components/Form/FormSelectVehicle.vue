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
          {{ item.vehicleModel }} - {{ item.vehicleRegistrationNumber }}
        </v-chip>
      </template>
      <template #item="{ item }">
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ item.vehicleMake }} {{ `${item.vehicleModel}` }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ `${item.vehicleRegistrationNumber}` }}
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

  // mounted() {
  //   this.$nextTick(() => {
  //     console.log('🚀 ~ mounted ~ this.items', this.items)
  //     this.dValue = this.vehicles[0]
  //     this.$emit('change', this.dValue)
  //   })
  // },

  // mounted() {
  //   console.log('🚀 ~ mounted ~ this.items', this.items)
  //   this.dValue = this.items[0]
  //   this.$emit('change', this.dValue)
  // },

  methods: {
    ...mapActions({
      getVehicles: 'vehicles/getVehicles',
    }),
    change(evt) {
      // console.log('🚀 ~ change ~ evt', evt)
      this.$emit('change', evt)
      // console.log(evt)
    },
  },
}
</script>

<style lang="scss" scoped></style>
