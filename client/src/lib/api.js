import axios from 'axios'
import { getToken } from './auth'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

const baseUrl = '/api'

// * Events requests:
export function getAllEvents() {
  return axios.get(`${baseUrl}/events`)
}

export function getSingleEvent(id) {
  return axios.get(`${baseUrl}/events/${id}`)
}

export function createEvent(formdata) {
  return axios.post(`${baseUrl}/events`, formdata, headers())
}

// * Venues requests:
export function getAllVenues() {
  return axios.get(`${baseUrl}/venues`)
}

export function getSingleVenue(id) {
  return axios.get(`${baseUrl}/venues/${id}`)
}

export function createVenue(formdata) {
  return axios.post(`${baseUrl}/venues`, formdata, headers())
}

// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}

export function showUserProfile(id) {
  return axios.get(`${baseUrl}/profile/${id}`)
}
