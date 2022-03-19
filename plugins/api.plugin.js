export default function ({ $axios, $config }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        // Accept: 'text/plain, */*',
      },
    },
  })

  // Set baseURL to something different
  api.setBaseURL('https://api.axamansard.com/api/insurance')

  // Inject to context as $api
  inject('api', api)
}
