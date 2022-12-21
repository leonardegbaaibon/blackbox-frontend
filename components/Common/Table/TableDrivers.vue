<template>
  <v-card flat>
    <v-card-title class="py-5">
      <p class="mb-0 font-weight-bold">All Drivers</p>
      <v-spacer></v-spacer>
      <FormInput
        v-model="search"
        class="mr-3"
        type="text"
        placeholder="Search Drivers"
        :hide-details="true"
      />
      <FormButton @click.native="$emit('clicked')">New Driver</FormButton>
      <!-- <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field> -->
    </v-card-title>
    <v-data-table
      no-data-text="No drivers created"
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template #[`item.name`]="{ item }">
        <v-row class="py-3" align="center">
          <v-col cols="auto">
            <v-avatar color="primary" size="40">
              <img
                v-if="item.driverPhoto"
                :src="item.driverPhoto"
                :alt="item.driverName"
              />
              <v-icon v-else dark>mdi-account</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <p class="text-subtitle-1 mb-0 font-weight-bold">
              {{ item.driverName }}
            </p>
            <p class="mb-0">
              {{ item.driverEmail }}
            </p>
          </v-col>
        </v-row>
      </template>
      <template #[`item.createdAt`]="{ item }">
        {{ $dayjs(item.createdAt).format('DD MMMM, YYYY • hh:mm A') }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="navigateDriver(item)">
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
          text: 'Driver Information',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Address', value: 'driverAddress' },
        { text: 'License', value: 'driverLicenseNumber' },
        { text: 'Phone', value: 'driverPhoneNumber' },
        // { text: 'NIN', value: 'driverNin' },
        { text: 'Created on', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false, width: 150 },
      ],
    }
  },

  methods: {
    navigateDriver(evt) {
      console.log('🚀 ~ navigateVehicle ~ evt', evt)
      this.$router.push(`/drivers/${evt.driverId}`)
    },
  },
}
</script>

<style lang="scss" scoped></style>
