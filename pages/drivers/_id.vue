<template>
  <div>
    <!-- <v-container fluid class="fill-height"> -->
    <v-progress-circular
      v-if="$fetchState.pending"
      indeterminate
    ></v-progress-circular>
    <v-row v-else justify="center" align="start">
      <!-- <v-col md="12" class="">
        <div class=""><TripRanking /></div>
      </v-col> -->
      <v-col md="8">
        <CardScorecard
          :score="scoreDetails[0].Score"
          :safety-class="scoreDetails[0].SafetyClass"
          :distance="distanceDetails[0].Distance"
          :position="scoreDetails[0].Position"
          :discount="discountDetails.premium_discount"
          :percent="discountDetails.premium_percent"
          class="mb-7"
        />
        <div id="chart" class="mt-3 white pa-3 rounded">
          <ApexCharts
            type="bar"
            height="380"
            :options="chartOptions"
            :series="series"
          ></ApexCharts>
        </div>
        <!-- <CardScoreTable class="mb-7" /> -->
      </v-col>
      <v-col md="4" class="">
        <div class=""><CardDriverInfo v-bind="driver" /></div>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col md="12" class="">
        <div class=""><TripRanking /></div>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      driver: null,
      loading: false,
      eventDetails: [],
      scoreDetails: [{ Score: 0, Position: 24, SafetyClass: 'Somewhat Safe' }],
      distanceDetails: [{ Distance: 0 }],
      discountDetails: {},
      // chart data
      // series: [
      //   {
      //     data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      //   },
      // ],
      // chartOptions: {
      //   chart: {
      //     type: 'bar',
      //     height: 380,
      //   },
      //   plotOptions: {
      //     bar: {
      //       barHeight: '100%',
      //       distributed: true,
      //       horizontal: true,
      //       dataLabels: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      //   colors: [
      //     '#33b2df',
      //     '#546E7A',
      //     '#d4526e',
      //     '#13d8aa',
      //     '#A5978B',
      //     '#2b908f',
      //     '#f9a3a4',
      //     '#90ee7e',
      //     '#f48024',
      //     '#69d2e7',
      //   ],
      //   dataLabels: {
      //     enabled: true,
      //     textAnchor: 'start',
      //     style: {
      //       colors: ['#fff'],
      //     },
      //     formatter(val, opt) {
      //       return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
      //     },
      //     offsetX: 0,
      //     dropShadow: {
      //       enabled: true,
      //     },
      //   },
      //   stroke: {
      //     width: 1,
      //     colors: ['#fff'],
      //   },
      //   xaxis: {
      //     categories: [
      //       'South Korea',
      //       'Canada',
      //       'United Kingdom',
      //       'Netherlands',
      //       'Italy',
      //       'France',
      //       'Japan',
      //       'United States',
      //       'China',
      //       'India',
      //     ],
      //   },
      //   yaxis: {
      //     labels: {
      //       show: false,
      //     },
      //   },
      //   title: {
      //     text: 'Events',
      //     align: 'center',
      //     floating: true,
      //   },
      //   // subtitle: {
      //   //   text: 'Category Names as DataLabels inside bars',
      //   //   align: 'center',
      //   // },
      //   tooltip: {
      //     theme: 'dark',
      //     x: {
      //       show: false,
      //     },
      //     y: {
      //       title: {
      //         formatter() {
      //           return ''
      //         },
      //       },
      //     },
      //   },
      // },
    }
  },

  async fetch() {
    this.driver = await this.getDriver({ id: this.$route.params.id })
    // this.history = await this.getTripHistory({ id: this.$route.params.id })
    // this.vehicles = vehicles
  },

  computed: {
    ...mapState({
      // vehicles: (state) => state.vehicles.all,
    }),
    series() {
      return [
        {
          name: 'Early Morning',
          data: this.eventDetails
            .filter((el) => el.eventpartofday === 'Early Morning')
            .map((el) => el[`Number of event`]),
        },
        {
          name: 'Morning',
          data: this.eventDetails
            .filter((el) => el.eventpartofday === 'Morning')
            .map((el) => el[`Number of event`]),
        },
        {
          name: 'Noon',
          data: this.eventDetails
            .filter((el) => el.eventpartofday === 'Noon')
            .map((el) => el[`Number of event`]),
        },
        {
          name: 'Evening',
          data: this.eventDetails
            .filter((el) => el.eventpartofday === 'Eve')
            .map((el) => el[`Number of event`]),
        },
        {
          name: 'Night',
          data: this.eventDetails
            .filter((el) => el.eventpartofday === 'Night')
            .map((el) => el[`Number of event`]),
        },
        {
          name: 'Late Night',
          data: this.eventDetails
            .filter((el) => el.eventpartofday === 'Late Night')
            .map((el) => el[`Number of event`]),
        },
      ]
    },
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                },
              },
            },
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        title: {
          text: 'Events',
        },
        xaxis: {
          categories: Array.from(
            new Set(this.eventDetails.map((el) => el.event))
          ),
          labels: {
            formatter(val) {
              return val
            },
          },
        },
        yaxis: {
          title: {
            text: 'Event',
          },
        },
        tooltip: {
          y: {
            formatter(val) {
              return val + ' events'
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      }
    },
  },

  async mounted() {
    try {
      const resp = await this.$scorecard.get('fetchData')
      // await this.$scorecard.get('fetchData')
      const driverIds = resp.data.data.map((x) => x.DriverID)
      // const driverIds = [21, 19, 8, 14, 17, 1, 13, 12, 11]

      // Pick driverID randomly from drivers array
      const index = Math.floor(Math.random() * (driverIds.length - 1 + 1) + 1)

      const results = await Promise.all([
        this.$scorecard.get(`get_behavioural_events/${driverIds[index]}`),
        this.$scorecard.get(`get_distance_travelled/${driverIds[index]}`),
        this.$scorecard.get(`get_driver_scores/${driverIds[index]}`),
        this.$scorecard.get(`get_driver_discount/${driverIds[index]}`),
      ])
      this.eventDetails = results[0].data.data
      this.distanceDetails = results[1].data.data
      this.scoreDetails = results[2].data.data
      this.discountDetails = results[3].data

      // console.log('🚀 ~ mounted ~ resp', resp.data.data)
      console.log('🚀 ~ mounted ~ results', results)
    } catch (error) {
      console.log('🚀 ~ mounted ~ error', error)
    }
  },

  methods: {
    ...mapActions({
      getDriver: 'drivers/getOneDriver',
    }),
  },
}
</script>
