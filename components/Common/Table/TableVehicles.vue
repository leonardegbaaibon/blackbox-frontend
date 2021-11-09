<template>
  <v-card flat>
    <v-card-title class="py-5">
      <p class="mb-0 font-weight-bold">All Vehicles</p>
      <v-spacer></v-spacer>
      <FormInput
        v-model="search"
        class="mr-3"
        type="text"
        placeholder="Search Vehicles"
        :hide-details="true"
      />
      <FormButton @click.native="$emit('clicked')">New Vehicle</FormButton>
      <!-- <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field> -->
    </v-card-title>
    <v-data-table
      no-data-text="No vehicles created"
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template #[`item.createdAt`]="{ item }">
        {{ $dayjs(item.createdAt).format('DD MMMM, YYYY • hh:mm A') }}
      </template>
      <template #[`item.vehicleColor`]="{ item }">
        <v-avatar
          :class="[
            item.vehicleColor
              .split(/(?=[A-Z])/)
              .join('-')
              .toLowerCase(),
          ]"
          size="24"
          class="mr-3"
        ></v-avatar>
        {{ item.vehicleColor }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="navigateVehicle(item)">
          mdi-eye
        </v-icon>
        <v-icon small class="mr-2" @click="$emit('clicked:edit', item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="$emit('clicked:delete', item)">mdi-delete</v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Make',
          align: 'start',
          sortable: false,
          value: 'vehicleMake',
        },
        { text: 'Color', value: 'vehicleColor' },
        { text: 'Registration Number', value: 'vehicleRegistrationNumber' },
        { text: 'Model', value: 'vehicleModel' },
        { text: 'Year', value: 'vehicleYear' },
        { text: 'VIN', value: 'vehicleVin' },
        { text: 'Created at', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },

  methods: {
    navigateVehicle(evt) {
      // console.log('🚀 ~ navigateVehicle ~ evt', evt)
      this.$router.push(`vehicles/${evt.vehicleId}`)
    },
  },
}
</script>

<style lang="scss" scoped></style>
