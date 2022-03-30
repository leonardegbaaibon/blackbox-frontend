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
        const loginResponse = await this.$auth.loginWith('local', {
          data: {
            ...evt,
          },
        })

        const traccarResponse = await this.$traccarApi.$get('/session', {
          withCredentials: true,
          params: { token: loginResponse.data.data.session },
          auth: {
            username: evt.email,
            password: evt.password,
          },
        })

        console.log('🚀 ~ login ~ traccarResponse', traccarResponse)
        const userResponse = await this.getUser({
          id: loginResponse.data.data.sub,
        })
        this.$auth.setUser(userResponse)
      } catch (error) {
        console.log('🚀 ~ login ~ error', error)
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
