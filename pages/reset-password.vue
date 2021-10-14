<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="center">
    <v-col md="4" class="">
      <div class="text-center">
        <Logo class="mb-7" />
      </div>

      <!-- Alert -->
      <v-alert v-model="alert" color="error" dismissible dense type="success">
        {{ error }}
      </v-alert>

      <v-stepper v-model="stepper">
        <v-stepper-items>
          <!-- Recover form -->
          <v-stepper-content step="1">
            <FormRecover :loading="loading" @submit="recover" />
          </v-stepper-content>

          <!-- Change Password Card -->
          <v-stepper-content step="2">
            <FormChangePassword :loading="loading" @submit="changePassword" />
          </v-stepper-content>

          <!-- Success Card -->
          <v-stepper-content step="3">
            <CardSuccess
              message="Your password has been successfully recovered."
              button-text="Login now"
              @clicked="$router.push('/')"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'noAuth',

  auth: 'guest',

  data() {
    return {
      loading: false,
      alert: false,
      error: null,

      stepper: 1,
      email: '',
    }
  },

  // watch: {
  //   isLogin(newValue, oldValue) {
  //     this.alert = false
  //   },
  // },

  // created() {
  //   console.log(`this.$route`, this.$route)
  // },

  methods: {
    ...mapActions({
      request: 'user/authentication/requestPasswordChange',
      change: 'user/authentication/passwordReset',
    }),

    async recover(evt) {
      this.loading = true
      this.email = evt.email
      try {
        await this.request(evt)
        this.stepper++
      } catch (error) {
        this.alert = true
        this.error = error.response.data.message
      } finally {
        this.loading = false
      }
    },

    async changePassword(evt) {
      this.loading = true
      evt = { email: this.email, ...evt }
      console.log('🚀 ~ changePassword ~ evt', evt)
      try {
        await this.change(evt)
        this.stepper++
      } catch (error) {
        this.alert = true
        this.error = error.response.data.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
