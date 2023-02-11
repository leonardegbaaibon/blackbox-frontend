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
  api.setBaseURL('http://localhost:8082/api')

  inject('api', api)
}
