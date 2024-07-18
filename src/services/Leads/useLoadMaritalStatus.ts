import { axios } from "../../lib/axios"

export const loadMaritalStatus = async () => {
  try {
    const response = await axios.get('/tiposEstadoCivil')

    return response.data
  } catch (error) {
    console.log(error)
  }
}
