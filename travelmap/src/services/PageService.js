import axios from 'axios'

const apiPages = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_DOMAIN}/wp-json/wp/v2`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPages() {
    return apiPages.get('/pages')
  },
  getPage(id) {
    return apiPages.get('/pages/' + id)
  },
  postPage(page) {
    return apiPages.post('/pages', page)
  }
}
