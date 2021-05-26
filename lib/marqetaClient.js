import axios from "axios"

function createClient(baseUrl, username, password) {
  // https://github.com/axios/axios#axioscreateconfig
  return axios.create({
    baseURL: baseUrl || process.env.MARQETA_API_BASE_URL,
    timeout: 1000,
    auth: {
      username: username || process.env.MARQETA_API_USERNAME,
      password: password || process.env.MARQETA_API_PASSWORD
    },
  })
}

export default createClient()
