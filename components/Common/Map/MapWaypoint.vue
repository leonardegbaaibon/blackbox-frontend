<script>
export default {
  props: {
    // index: {
    //   type: Number,
    //   required: true,
    // },
    // length: {
    //   type: Number,
    //   required: true,
    // },
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
    const markers = [...this.markers]
    const { DirectionsService } = this.google.maps
    const { DirectionsRenderer } = this.google.maps
    // const { InfoWindow } = this.google.maps

    // Info Window
    //     const contentString = (marker) => `
    //     <div class="rich-info-window">
    // 	<div class="d-flex justify-space-between">
    // 		<div>Speed</div>
    // 		<div class="font-weight-bold">${marker.speed}</div>
    // 	</div>
    // 	<hr class="my-3" />
    // 	<div class="d-flex justify-space-between">
    // 		<div>Fuel Consumed</div>
    // 		<div class="font-weight-bold">${marker.attributes.fuelConsumption}</div>
    // 	</div>
    // 	<hr class="my-3" />
    // 	<div class="d-flex justify-space-between">
    // 		<div>Total Distance</div>
    // 		<div class="font-weight-bold">${marker.attributes.totalDistance}</div>
    // 	</div>
    // 	<hr class="my-3" />
    // 	<div class="d-flex justify-space-between">
    // 		<div>Time</div>
    // 		<div class="font-weight-bold">${this.$dayjs(marker.deviceTime).format(
    //       'YYYY-MM_DD - HH:MM A'
    //     )}</div>
    // 	</div>
    // 	<hr class="my-3" />
    // 	<div class="d-flex justify-space-between">
    // 		<div>In Motion</div>
    // 		<div class="font-weight-bold">${
    //       marker.attributes.motion ? 'TRUE' : 'FALSE'
    //     }</div>
    // 	</div>
    // 	<hr class="my-3" />
    // 	<div class="d-flex justify-space-between">
    // 		<div>Ignition</div>
    // 		<div>${marker.attributes.ignition ? 'TRUE' : 'FALSE'}</div>
    // 	</div>
    // </div>
    // `

    const directionService = new DirectionsService()
    const directionRenderer = new DirectionsRenderer()
    directionRenderer.setMap(this.map)

    // * init
    const waypts = []
    markers.forEach((element) => {
      waypts.push({
        stopover: true,
        location: { lat: element.latitude, lng: element.longitude },
      })
    })
    directionService
      .route({
        origin: {
          lat: markers[0].latitude,
          lng: markers[0].longitude,
        },
        destination: {
          lat: markers[markers.length - 1].latitude,
          lng: markers[markers.length - 1].longitude,
        },
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: this.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionRenderer.setDirections(response)
        // const route = response.routes[0]
      })
      .catch((e) => console.error('Directions request failed due to ' + e))
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
