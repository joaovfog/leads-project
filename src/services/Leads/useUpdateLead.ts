import { axios } from "../../lib/axios"

export const useUpdateLead = async (id: string, data: any) => {
  try {
    const response = await axios.put(`/leads/${id}`, data)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
