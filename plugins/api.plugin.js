export default function ({ $axios, $config }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        // Accept: 'text/plain, */*',
      },
    },
  })

  const traccarApi = $axios.create({
    // withCredentials: true,
    headers: {
      common: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  })

  api.setBaseURL('https://api.axamansard.com/api/insurance')
  traccarApi.setBaseURL('http://3.133.13.158:8082/api')

  traccarApi.interceptors.response.use(function (response) {
    console.log('🚀 ~ plugin - response', response)
    return response
  })

  inject('api', api)
  inject('traccarApi', traccarApi)
}
