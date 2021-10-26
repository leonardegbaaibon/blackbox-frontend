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
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
