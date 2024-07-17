import { axios } from "../../lib/axios"

export const loadLeads = async () => {
  try {
    const response = await axios.get('/leads')

    return response.data
  } catch (error) {
    console.log(error)
  }
}
