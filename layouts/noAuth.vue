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
export default {
  data() {
    return {}
  },

  //* async mounted() {
  //   const dataRef = this.$fire.database.ref(`realtime`)
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
