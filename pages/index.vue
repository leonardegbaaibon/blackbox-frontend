<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="start">
    <v-col md="6" lg="4" class="">
      <div class="text-center">
        <Logo class="mb-7" />
      </div>

      <!-- Alert -->
      <v-alert v-model="alert" color="error" dismissible dense type="success">
        {{ error }}
      </v-alert>

      <!-- Login form -->
      <template v-if="!done">
        <FormLogin
          v-if="isLogin"
          :loading="loading"
          @click:switch="isLogin = false"
          @submit="login"
        />

        <!-- Signup form -->
        <FormSignup
          v-else
          :loading="loading"
          @click:switch="isLogin = true"
          @submit="signup"
        />
      </template>

      <!-- Success Card -->
      <CardSuccess v-if="done" button-text="Go to Login" @clicked="reset" />
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'noAuth',

  middleware: 'guest',

  data() {
    return {
      isLogin: true,
      done: false,
      loading: false,
      alert: false,
      error: null,
    }
  },

  watch: {
    isLogin(newValue, oldValue) {
      this.alert = false
    },
  },

  mounted() {
    // const encryptedText = this.$CryptoJS.AES.encrypt(
    //   'Hi There!',
    //   'Secret Passphrase'
    // ).toString()
    // const decryptedText = this.$CryptoJS.AES.decrypt(
    //   encryptedText,
    //   'Secret Passphrase'
    // ).toString(this.$CryptoJS.enc.Utf8)
    // console.log('🚀 ~ mounted ~ encryptedText', encryptedText)
    // console.log('🚀 ~ mounted ~ decryptedText', decryptedText)
  },

  methods: {
    ...mapActions({
      register: 'user/authentication/register',
      getUser: 'user/authentication/getUserInfo',
    }),

    async signup(evt) {
      this.alert = false
      this.loading = true
      const { confirm, ...restForm } = evt
      try {
        await this.register(restForm)
        this.done = true
      } catch (error) {
        this.alert = true
        this.error = error.response.data.message
      } finally {
        this.loading = false
      }
    },

    async login(evt) {
      this.alert = false
      this.loading = true
      try {
        // const params = new URLSearchParams()
        // params.append(
        //   'email',
        //   process.env.NODE_ENV === 'development'
        //     ? 'richardsaseun@gmail.com'
        //     : evt.email
        // )
        // params.append(
        //   'password',
        //   process.env.NODE_ENV === 'development' ? 'admin' : evt.password
        // )
        // const { data: token } = await this.$api.post('session/token', params)
        // await this.$api.get(`session/?token=${token}`)

        // login to blackbox
        const loginResponse = await this.$auth.loginWith('local', {
          data: {
            ...evt,
          },
        })
        const userResponse = await this.getUser({
          id: loginResponse.data.data.sub,
        })
        this.$auth.setUser(userResponse)

        // Encrypt and Save to localstorage
        // const email = this.$CryptoJS.AES.encrypt(evt.email, 'SECRET').toString()
        // const password = this.$CryptoJS.AES.encrypt(
        //   evt.password,
        //   'SECRET'
        // ).toString()
        // localStorage.setItem('abc', email)
        // localStorage.setItem('xyz', password)
      } catch (error) {
        this.alert = true
        this.error = error.response?.data?.message
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.done = false
      this.isLogin = true
    },
  },
}
</script>
