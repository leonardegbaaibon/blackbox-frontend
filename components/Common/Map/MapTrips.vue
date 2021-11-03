<template>
  <MapHandler
    :style="{ height: `${height}px` }"
    :map-config="mapConfig"
    class="rounded-lg"
  >
    <template v-if="items.length !== 0" slot-scope="{ google, map }">
      <MapMarker
        v-for="(marker, index) in items"
        :key="marker.id"
        :length="items.length"
        :index="index"
        :marker="marker"
        :google="google"
        :map="map"
      />
      <!-- <MapWaypoint :markers="items" :google="google" :map="map" /> -->
    </template>
  </MapHandler>
</template>

<script>
import { mapState } from 'vuex'
import { mapSettings } from '@/utils/mapSettings'

export default {
  props: {
    height: {
      type: [Number, String],
      default: 500,
    },

    items: {
      type: Array,
      default: () => [],
    },
  },

  // components: {
  // 	MapHandler: () => import('@/components/Common/Map/GoogleMapHandler'),
  // 	MapMarker: () => import('@/components/Common/Map/GoogleMapMarker'),
  // },

  data() {
    return {
      markers: [
        {
          id: 'a',
          title: 'freak',
          coordinates: { lat: 6.459295, lng: 3.335831 },
        },
        {
          id: 'b',
          coordinates: { lat: 5, lng: 99 },
        },
        {
          id: 'c',
          coordinates: { lat: 6, lng: 97 },
        },
      ],
    }
  },

  computed: {
    ...mapState({
      trips: (state) => state.trips.all,
    }),
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter,
      }
    },

    mapCenter() {
      return { lat: 6.459295, lng: 3.335831 }
    },
  },

  updated() {},
}
</script>

<style lang="sass" scoped></style>
