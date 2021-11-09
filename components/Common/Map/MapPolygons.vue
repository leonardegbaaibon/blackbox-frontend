<script>
// import { POINT_MARKER_ICON_CONFIG } from '@/utils/mapSettings'

export default {
  props: {
    google: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
    markers: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    // const { Marker } = this.google.maps
    const { Polyline } = this.google.maps
    const lineSymbol = {
      path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    }

    const vehiclePath = new Polyline({
      path: this.markers.map((x) => ({ lat: x.latitude, lng: x.longitude })),
      geodesic: true,
      strokeColor: '#0F084B',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      icons: [
        {
          icon: lineSymbol,
          offset: '100%',
        },
      ],
    })

    vehiclePath.setMap(this.map)
  },

  // eslint-disable-next-line vue/require-render-return
  render() {},
}
</script>

<style>
.rich-info-window {
  width: 250px;
  /* border: 2px solid #0d0221; */
}
</style>
