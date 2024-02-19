import axios from 'axios'

const apiTrips = axios.create({
	baseURL: `${process.env.VUE_APP_BACKEND_DOMAIN}/wp-json/wp/v2`,
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

export default {
	getTrips() {
		return apiTrips.get('/trips')
	},
	getTrip(id) {
		return apiTrips.get('/trips/' + id)
	},
	postTrip(trip) {
		return apiTrips.post('/trips', trip)
	}
}
