import axios from 'axios'

// definitive type backend API
export type User = {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  avatar: string
  gender: string
  phone_number: string
  social_insurance_number: string
  date_of_birth?: string
}

const client = axios.create({
  /* previous back API*/
  //baseURL: 'http://127.0.0.1:8000/api/users/',

  /* backend API*/
  baseURL: `${import.meta.env.VITE_LOCAL_HOST}/api/user/`,
})

async function getUsers() {
  return client.get<User[]>('').then((res) => res.data)
}

async function getOneUser(id: string) {
  return client.get<User>(`${id}/`).then((res) => res.data)
}

export { getUsers, getOneUser }
