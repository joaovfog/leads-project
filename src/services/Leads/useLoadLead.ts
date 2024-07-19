import { axios } from "../../lib/axios"

export const loadLead = async (id: string) => {
  try {
    const response = await axios.get(`/leads/${id}`)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
