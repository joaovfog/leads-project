import { axios } from "../../lib/axios"

export const deleteLead = async (id: string) => {
  try {
    const response = await axios.delete(`/leads/${id}`)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
