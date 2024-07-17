import { axios } from "../../lib/axios"

export const loadLeads = async () => {
  const { data } = await axios.get('/leads')

  return data
}
