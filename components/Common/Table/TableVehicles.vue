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
      :search="search"
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
          size="12"
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
      <template #[`item.device`]="{ item }">
        <v-icon :color="item.device ? 'success' : 'error'" small>
          {{ item.device ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
        {{ item.device ? 'Assigned' : 'Unassigned' }}
      </template>
      <template #[`item.chauffeur`]="{ item }">
        <v-icon :color="item.chauffeur ? 'success' : 'error'" small>
          {{ item.chauffeur ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
        {{ item.chauffeur ? 'Assigned' : 'Unassigned' }}
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
        { text: 'Color', value: 'vehicleColor', width: '10%' },
        { text: 'Registration Number', value: 'vehicleRegistrationNumber' },
        { text: 'Model', value: 'vehicleModel' },
        { text: 'Year', value: 'vehicleYear' },
        { text: 'VIN', value: 'vehicleVin' },
        { text: 'Device connected', value: 'device', width: '15%' },
        { text: 'Driver Assigned', value: 'chauffeur', width: '15%' },
        { text: 'Created on', value: 'createdAt', width: '35%' },
        { text: 'Actions', value: 'actions', sortable: false, width: 150 },
      ],
    }
  },

  methods: {
    navigateVehicle(evt) {
      this.$router.push(`/vehicles/${evt.vehicleId}`)
    },
  },
}
</script>

<style lang="scss" scoped></style>
