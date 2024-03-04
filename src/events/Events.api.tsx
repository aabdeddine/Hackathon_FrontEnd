import axios from 'axios'
import { EventFormData } from '../pages/NewEvent'

// definitive type backend API
export type EventF = {
  id: number
  event_name: string
  region: string
  department: string
  municipality: string
  postal_code: string
  complement: string
  road_type: string
  road_name: string
  road_number: string
  mail: string
  website: string
  discipline: string
  subcategory: string
  geocoordinates_x: number
  geocoordinates_y: number
  date: string
}

const client = axios.create({
  /* previous back API*/
  //baseURL: 'http://127.0.0.1:8000/api/events/',

  /* backend API*/
  baseURL: `${import.meta.env.VITE_LOCAL_HOST}/api/festival/`,
})

function getEvents() {
  return client.get<EventF[]>('').then((res) => res.data)
}

function getOneEvent(id: number) {
  return client.get<EventF>(`${id}/`).then((res) => res.data)
}
function getEventsByName(eventName: string) {
  return client.get<EventF[]>(`?event_name__contains=${eventName}`).then((res) => res.data)
}

function postEvent(event: EventFormData) {
  return client.post<EventFormData>('', { ...event }).then((res) => res.data)
}

function updateEvent({ id, ...event }: EventF) {
  return client.put<EventF>(`${id}/`, { ...event }).then((res) => res.data)
}

function deleteOneEvent(id: number) {
  return client.delete<EventF>(`${id}/`).then((res) => res.data)
}


export { getEvents, getOneEvent, getEventsByName, postEvent, updateEvent, deleteOneEvent }
