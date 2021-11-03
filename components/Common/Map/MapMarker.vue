<script>
import { POINT_MARKER_ICON_CONFIG } from '@/utils/mapSettings'

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
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
    const { LatLngBounds } = this.google.maps
    const { InfoWindow } = this.google.maps
    const { Size } = this.google.maps

    let icon
    if (this.index === 0) {
      icon = POINT_MARKER_ICON_CONFIG.start
    } else if (this.index !== this.length - 1) {
      if (this.marker.attributes.motion) {
        icon = POINT_MARKER_ICON_CONFIG.on
      } else {
        icon = POINT_MARKER_ICON_CONFIG.off
      }
    } else {
      icon = POINT_MARKER_ICON_CONFIG.end
    }

    const bounds = new LatLngBounds()

    // Re center map according to location
    this.map.setCenter({
      lat: this.marker.latitude,
      lng: this.marker.longitude,
    })

    // eslint-disable-next-line no-new
    const marker = new Marker({
      position:
        this.marker.latitude && this.marker.longitude
          ? new this.google.maps.LatLng({
              lat: this.marker.latitude,
              lng: this.marker.longitude,
            })
          : null,
      title: this.marker.protocol,
      // marker: this.marker,
      map: this.map,
      icon: { url: icon, scaledSize: new Size(10, 10) },
    })
    bounds.extend(marker.getPosition())

    // Info Window
    const contentString = `
    <div class="rich-info-window">
	<div class="d-flex justify-space-between">
		<div>Speed</div>
		<div class="font-weight-bold">${this.marker.speed}</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>Fuel Consumed</div>
		<div class="font-weight-bold">${this.marker.attributes.fuelConsumption}</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>Total Distance</div>
		<div class="font-weight-bold">${this.marker.attributes.totalDistance}</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>Time</div>
		<div class="font-weight-bold">${this.$dayjs(this.marker.deviceTime).format(
      'YYYY-MM_DD - HH:MM A'
    )}</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>In Motion</div>
		<div class="font-weight-bold">${
      this.marker.attributes.motion ? 'TRUE' : 'FALSE'
    }</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>Ignition</div>
		<div>${this.marker.attributes.ignition ? 'TRUE' : 'FALSE'}</div>
	</div>
</div>
`

    const infoWindow = new InfoWindow({ content: contentString })
    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map: this.map,
        shouldFocus: true,
      })
    })
    marker.addListener('mouseout', () => {
      setTimeout(() => {
        infoWindow.close()
      }, 2000)
    })

    // if (this.index === 0) this.map.fitBounds(bounds)
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
