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
    marker: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    const { Marker } = this.google.maps

    // eslint-disable-next-line no-new
    new Marker({
      position: this.marker.coordinates
        ? new this.google.maps.LatLng({ ...this.marker.coordinates })
        : null,
      title: this.marker.title,
      // marker: this.marker,
      map: this.map,
      // icon: POINT_MARKER_ICON_CONFIG,
    })
  },

  // eslint-disable-next-line vue/require-render-return
  render() {},
}
</script>
