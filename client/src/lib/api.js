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

export function editEvent(id, formdata) {
  return axios.put(`${baseUrl}/events/${id}`, formdata, headers())
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

export function createEventComment(formdata, id) {
  return axios.post(`${baseUrl}/events/${id}/comments`, formdata, headers())
}

export function createVenueComment(formdata, id) {
  return axios.post(`${baseUrl}/venues/${id}/comments`, formdata, headers())
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

export function showUserProfile() {
  return axios.get(`${baseUrl}/profile/`, headers())
}

export function editUserProfile(formdata) {
  return axios.put(`${baseUrl}/update-profile/`, formdata, headers())
}
