<template>
  <v-row justify="center" align="center">
    <v-col md="12" class="">
      <MapHandler
        :style="{ height: '90vh' }"
        :map-config="mapConfig"
        class="rounded-lg"
      >
        <template
          v-if="positions.length !== 0"
          slot-scope="{ google, map, bounds }"
        >
          <MapDashboard
            v-for="(marker, index) in positions"
            :key="marker.id"
            :length="positions.length"
            :index="index"
            :marker="marker"
            :google="google"
            :bounds="bounds"
            :map="map"
          />
        </template>
      </MapHandler>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _, { isEmpty } from 'underscore'
import { mapState } from 'vuex'
import { mapSettings } from '@/utils/mapSettings'

export default {
  middleware: 'auth',

  data() {
    return { message: null, count: 0 }
  },

  computed: {
    ...mapState({
      positions: (state) => state.positions,
    }),
    mapConfig() {
      return {
        ...mapSettings,
        // center: this.mapCenter,
      }
    },
  },

  async mounted() {
    console.log('here')
    try {
      const response = await this.$api.post('socket', {
        email: 'access@tsaron.com',
        password: 'tsarontelemat@2022',
      })
      console.log('🚀 ~ mounted ~ response', response)
    } catch (error) {}
    // this.$socket.$on('message', (data) => {
    //   const message = JSON.parse(JSON.parse(data.data).utf8Data)
    //   if (!_.isEmpty(message)) {
    //     this.positions = message.positions
    //   }
    // })
  },

  methods: {},
}
</script>
