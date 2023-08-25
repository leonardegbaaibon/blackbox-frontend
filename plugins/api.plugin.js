export default function ({ $axios, $config }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    withCredentials: true,
    // headers: {
    //   common: {
    //     // Accept: 'text/plain, */*',
    //   },
    // },
    // auth: {
    //   username: 'access@tsaron.com',
    //   password: 'tsarontelemat@2022',
    // },
  })

  // api.setBaseURL('https://api.axamansard.com/api/insurance')
  api.setBaseURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8082/api'
      : 'https://traccar.blackboxservice.monster/api'
  )
  inject('api', api)
}
// process.env.NODE_ENV !== 'development'
//   ? 'http://localhost:8082/api'
//   : 'https://traccar.blackboxservice.monster/api'
