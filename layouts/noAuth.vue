<template>
  <v-app>
    <v-main class="fill-height secondary pt-12">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// const PAYLOAD = {
//   type: 'utf8',
//   utf8Data:
//     '{"positions":[{"id":461728,"attributes":{"sat":11,"odometer":8023371,"tripOdometer":7635,"fuelConsumption":76947,"status":0,"distance":0.0,"totalDistance":2222856.46,"motion":false},"deviceId":48,"type":null,"protocol":"castel","serverTime":"2022-04-23T13:26:11.000+00:00","deviceTime":"2022-04-23T13:25:17.000+00:00","fixTime":"2022-04-23T13:25:17.000+00:00","outdated":false,"valid":true,"latitude":7.169858333333333,"longitude":3.362915,"altitude":0.0,"speed":0.0,"course":93.9,"address":null,"accuracy":0.0,"network":null},{"id":461717,"attributes":{"sat":10,"odometer":595809,"tripOdometer":646,"fuelConsumption":7701,"status":262656,"distance":394.97,"totalDistance":561366.51,"motion":true},"deviceId":36,"type":null,"protocol":"castel","serverTime":"2022-04-23T12:19:30.000+00:00","deviceTime":"2022-04-23T12:19:28.000+00:00","fixTime":"2022-04-23T12:19:28.000+00:00","outdated":false,"valid":true,"latitude":7.15319,"longitude":3.31046,"altitude":0.0,"speed":15.2786,"course":192.0,"address":null,"accuracy":0.0,"network":null},{"id":464390,"attributes":{"sat":10,"odometer":194001,"tripOdometer":46,"fuelConsumption":15,"status":512,"distance":0.0,"totalDistance":241542.13,"motion":false},"deviceId":52,"type":null,"protocol":"castel","serverTime":"2022-05-11T09:45:00.000+00:00","deviceTime":"2022-05-11T09:44:59.000+00:00","fixTime":"2022-05-11T09:44:59.000+00:00","outdated":false,"valid":true,"latitude":6.72072,"longitude":3.42225,"altitude":0.0,"speed":0.0,"course":144.0,"address":null,"accuracy":0.0,"network":null},{"id":461745,"attributes":{"sat":11,"odometer":6553500,"tripOdometer":0,"fuelConsumption":38318,"status":512,"distance":0.0,"totalDistance":1702070.74,"motion":false},"deviceId":38,"type":null,"protocol":"castel","serverTime":"2022-04-27T12:47:11.000+00:00","deviceTime":"2022-04-27T12:47:10.000+00:00","fixTime":"2022-04-27T12:47:10.000+00:00","outdated":false,"valid":true,"latitude":7.13413,"longitude":3.34126,"altitude":0.0,"speed":0.0,"course":36.0,"address":null,"accuracy":0.0,"network":null},{"id":461724,"attributes":{"sat":11,"odometer":2697252,"tripOdometer":234,"fuelConsumption":27103,"status":262656,"distance":0.0,"totalDistance":2854643.06,"motion":false},"deviceId":39,"type":null,"protocol":"castel","serverTime":"2022-04-23T13:22:56.000+00:00","deviceTime":"2022-04-23T13:22:55.000+00:00","fixTime":"2022-04-23T13:22:55.000+00:00","outdated":false,"valid":true,"latitude":6.64817,"longitude":3.30801,"altitude":0.0,"speed":0.0,"course":269.0,"address":null,"accuracy":0.0,"network":null},{"id":461727,"attributes":{"sat":10,"odometer":6553500,"tripOdometer":0,"fuelConsumption":82566,"status":8651392,"distance":305.11,"totalDistance":7039783.71,"motion":true},"deviceId":40,"type":null,"protocol":"castel","serverTime":"2022-04-23T13:23:36.000+00:00","deviceTime":"2022-04-23T13:23:34.000+00:00","fixTime":"2022-04-23T13:23:34.000+00:00","outdated":false,"valid":true,"latitude":7.12386,"longitude":3.34249,"altitude":0.0,"speed":28.0691,"course":44.0,"address":null,"accuracy":0.0,"network":null},{"id":461709,"attributes":{"sat":10,"odometer":4834808,"tripOdometer":3879,"fuelConsumption":42324,"status":262656,"distance":2468.88,"totalDistance":4903145.44,"motion":true},"deviceId":41,"type":null,"protocol":"castel","serverTime":"2022-04-23T11:39:29.000+00:00","deviceTime":"2022-04-23T11:39:28.000+00:00","fixTime":"2022-04-23T11:39:28.000+00:00","outdated":false,"valid":true,"latitude":7.15633,"longitude":3.33224,"altitude":0.0,"speed":15.2203,"course":260.0,"address":null,"accuracy":0.0,"network":null},{"id":458868,"attributes":{"result":"1418B05SIM800L24","distance":0.0,"totalDistance":851121.4,"motion":false},"deviceId":42,"type":null,"protocol":"castel","serverTime":"2022-04-16T17:58:46.000+00:00","deviceTime":"2022-04-16T17:58:46.000+00:00","fixTime":"2022-04-16T17:58:42.000+00:00","outdated":false,"valid":true,"latitude":7.11183,"longitude":3.33797,"altitude":0.0,"speed":0.0,"course":324.0,"address":null,"accuracy":0.0,"network":null},{"id":439517,"attributes":{"sat":11,"odometer":12476565,"tripOdometer":11,"fuelConsumption":124798,"status":0,"distance":0.0,"totalDistance":2055991.35,"motion":false},"deviceId":44,"type":null,"protocol":"castel","serverTime":"2022-04-12T17:10:12.000+00:00","deviceTime":"2022-04-12T17:10:08.000+00:00","fixTime":"2022-04-12T17:10:08.000+00:00","outdated":false,"valid":true,"latitude":7.124558333333334,"longitude":3.323706666666667,"altitude":0.0,"speed":0.0,"course":106.4,"address":null,"accuracy":0.0,"network":null}]}',
// }
export default {
  data() {
    return {}
  },

  // async mounted() {
  //   const dataRef = this.$fire.database.ref(`realtime`)
  //   // console.log('this.$auth.user', this.$auth.user)
  //   // write data to the database
  //   try {
  //     await dataRef.set(JSON.parse(PAYLOAD.utf8Data))
  //   } catch (e) {
  //     alert(e)
  //     return
  //   }
  //   // alert('Success.')
  //   // recieve
  //   try {
  //     // const snapshot = await dataRef.once('value')
  //     await dataRef.on('value', (snapshot) => {
  //       console.log('🚀 ~ mounted ~ snapshot', snapshot.val())
  //     })

  //     // alert(snapshot.val().message)
  //   } catch (e) {
  //     alert(e)
  //   }
  // },
}
</script>
