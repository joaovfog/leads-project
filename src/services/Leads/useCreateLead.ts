import { axios } from "../../lib/axios"

export const useCreateLead = async (data: any) => {
  try {
    const response = await axios.post('/leads', data)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
