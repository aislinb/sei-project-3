import axios from 'axios'

const baseUrl = '/api'

// * Events requests:
export function getAllEvents() {
  return axios.get(`${baseUrl}/events`)
}

export function getSingleEvent(id) {
  return axios.get(`${baseUrl}/events/${id}`)
}

// * Venues requests:
export function getAllVenues() {
  return axios.get(`${baseUrl}/venues`)
}

export function getSingleVenue(id) {
  return axios.get(`${baseUrl}/venues/${id}`)
}

// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}
