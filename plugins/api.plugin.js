export default function ({ $axios, $config }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        // Accept: 'text/plain, */*',
      },
    },
  })

  api.setBaseURL('https://api.axamansard.com/api/insurance')

  inject('api', api)
}
