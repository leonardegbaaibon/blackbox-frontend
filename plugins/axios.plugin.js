export default ({ $axios, error }) => {
  $axios.onResponse((response) => {
    console.log(`[${response.status}] ${response.request.path}`)
  })

  $axios.onError((err) => {
    console.log(
      `[${err.response && err.response.status}] ${
        err.response && err.response.request.path
      }`
    )
    if (err.response.status === 404 || err.response.status === 500) {
      error({ statusCode: err.response.status, message: err.response.message })
    }
  })
}
