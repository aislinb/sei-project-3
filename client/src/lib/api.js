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

export function deleteEvent(id) {
  return axios.delete(`${baseUrl}/events/${id}`, headers())
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

export function deleteVenue(id) {
  return axios.delete(`${baseUrl}/venues/${id}`, headers())
}

// * Comments requests:
export function getAllComments() {
  return axios.get(`${baseUrl}/comments`)
}

export function getSingleComment(id) {
  return axios.get(`${baseUrl}/comments/${id}`)
}

export function createComment(formdata) {
  return axios.post(`${baseUrl}/comments`, formdata, headers())
}

export function deleteComment(id) {
  return axios.delete(`${baseUrl}/comments/${id}`, headers())
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
