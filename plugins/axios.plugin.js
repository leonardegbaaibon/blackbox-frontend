export default ({ $axios, error }) => {
  $axios.onResponse((response) => {
    console.log(`Response: [${response.status}] ${response.config.url}`)
  })

  $axios.onError((err) => {
    console.log(
      `Error: [${err.response && err.response.status}] ${
        err.response && err.response.config.url
      }`
    )
    if (
      (err.response.status === 404 &&
        err.response.config.url !== '/auth/sign.in') ||
      err.response.status === 500
    ) {
      error({ statusCode: err.response.status, message: err.response.message })
    }
  })
}
