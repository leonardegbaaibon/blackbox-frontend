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
    bounds: {
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
    const { InfoWindow } = this.google.maps
    const { Size } = this.google.maps

    const icon = {
      url: POINT_MARKER_ICON_CONFIG.carGreen,
      scaledSize: new Size(40, 40),
    }

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
      icon,
    })
    this.bounds.extend(marker.getPosition())
    this.map.fitBounds(this.bounds)

    // Info Window
    // Info Window
    const contentString = `
    <div class="rich-info-window pa-3">
	<div class="d-flex justify-space-between">
		<div>Vehicle</div>
		<div class="font-weight-bold">${this.marker.vehicleColor}, ${this.marker.vehicleMake} ${this.marker.vehicleModel},  ${this.marker.vehicleYear}</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>Plate Number</div>
		<div class="font-weight-bold">${this.marker.vehicleRegistrationNumber}</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>Speed</div>
		<div class="font-weight-bold">${this.marker.speed}</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>Driver Name</div>
		<div class="font-weight-bold">${this.marker.chauffeur?.driverName ? this.marker.chauffeur.driverName : ''}</div>
	</div>
	<hr class="my-3" />
	<div class="d-flex justify-space-between">
		<div>Driver Phone</div>
		<div class="font-weight-bold">${this.marker.chauffeur.driverPhoneNumber}</div>
	</div>
	<hr class="my-3" />
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
  },

  // eslint-disable-next-line vue/require-render-return
  render() { },
}
</script>

<style>
.rich-info-window {
  width: 250px;
  /* border: 2px solid #0d0221; */
}
</style>
