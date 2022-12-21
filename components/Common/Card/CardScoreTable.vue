<template>
  <v-card class="" flat>
    <v-card-text class="">
      <v-data-table
        flat
        :headers="headers"
        :items="discounts"
        :items-per-page="5"
        class="elevation-1"
      >
        <template #[`item.date`]="{ item }">
          <div>
            {{ $dayjs(item.date).format('MMMM, YYYY') }}
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  props: {},

  data() {
    return {
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        { text: 'Trips', value: 'trips' },
        { text: 'Discount Lost', value: 'lost' },
        { text: 'Discount', value: 'discount' },
      ],
      // discounts: [
      //   { date: this.$faker.lorem.words(), trips: '', lost: '', discount: '' },
      // ],
    }
  },

  computed: {
    ...mapGetters({
      gTrips: 'trips/directionsMap',
    }),
    ...mapState({
      trips: (state) => state.trips.all,
    }),
    discounts() {
      const discounts = []
      for (let index = 0; index < 7; index++) {
        discounts.splice(index, 0, {
          // date: this.$faker.date.month({ context: true }),
          date: this.$faker.date.between(
            '2022-01-01T00:00:00.000Z',
            '2022-05-04T00:00:00.000Z'
          ),
          trips: this.$faker.random.number({ min: 1, max: 50 }),
          lost: this.$faker.commerce.price(1500, 5000, 2, '₦'),
          discount: `${this.$faker.commerce.price(
            1500,
            5000,
            2,
            '₦'
          )} (${this.$faker.random.number({ min: 1, max: 50 })}%)`,
        })
      }
      return discounts
    },
  },

  methods: {
    ...mapActions({
      getTripData: 'trips/getVehicleTrips',
    }),

    getTrip() {
      // this.setShow(true)
      this.$emit('clicked:getTrip')
    },

    setShow(arg) {
      this.show = arg
    },
  },
}
</script>

<style lang="scss" scoped></style>
