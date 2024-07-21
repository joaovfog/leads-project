import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { loadLeads } from '../../services/Leads/useLoadLeads'
import { ILeads } from '../../interfaces/ILeads'
import { useNavigate } from 'react-router-dom'
import { FormikHelpers } from 'formik'
import { useCreateLead } from '../../services/Leads/useCreateLead'
import { toast } from 'react-toastify'
import { useUpdateLead } from '../../services/Leads/useUpdateLead'
import { loadLead } from '../../services/Leads/useLoadLead'

const LeadsContext = createContext<LeadsContextType | null>(null)

interface LeadsProviderProps {
  children: ReactNode
}

interface FormData {
  cpf: string
  nome: string
  nomeEstadoCivil: string
  nomeConjuge: string
  email: string
  telefone: string
}

interface LeadsContextType {
  leads: ILeads[]
  setLeads: any
  selectedLead: ILeads | null
  setSelectedLead: (lead: ILeads | null) => void
  initLeads: ILeads[]
  error: Error | null
  isLoading: boolean
  currentStep: number
  setCurrentStep: (step: number) => void
  leadData: FormData
  setLeadData: (data: FormData) => void
  handleSubmit: (values: FormData, actions: any) => Promise<void>
  fetchLeadById: any
}

export const LeadsProvider: React.FC<LeadsProviderProps> = ({
  children,
}: LeadsProviderProps) => {
  const navigate = useNavigate()

  const [leads, setLeads] = useState<ILeads[]>([])
  const [initLeads, setInitLeads] = useState<ILeads[]>([])
  const [selectedLead, setSelectedLead] = useState<ILeads | null>(null)

  const [error, setError] = useState<Error | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [currentStep, setCurrentStep] = useState<number>(0)

  const [leadData, setLeadData] = useState<FormData>({
    cpf: '',
    nome: '',
    nomeEstadoCivil: 'Solteiro(a)',
    nomeConjuge: '',
    email: '',
    telefone: '',
  })

  const fetchLeads = useCallback(async () => {
    setIsLoading(true)

    try {
      const data = await loadLeads()

      setInitLeads(data)
      setLeads(data)
      setError(null)
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchLeadById = useCallback(async (id: string) => {
    setIsLoading(true)

    try {
      const data = await loadLead(id)

      setSelectedLead(data)
      setLeadData({
        cpf: data.cpf,
        nome: data.nome,
        nomeEstadoCivil: data.nomeEstadoCivil,
        nomeConjuge: data.nomeConjugue,
        email: data.email,
        telefone: data.telefone,
      })
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSubmit = async (
    values: FormData,
    actions: FormikHelpers<FormData>
  ) => {
    try {
      const leadData = {
        ...values,
        cpf: values.cpf.replace(/[^\d]/g, ''),
        telefone: values.telefone.replace(/[^\d]/g, ''),
      }

      if (selectedLead?.id) {
        await useUpdateLead(selectedLead.id, leadData)

        toast.success('Lead atualizado com sucesso!', {
          onClose: () => navigate('/'),
        })

        fetchLeads()
      } else {
        await useCreateLead(leadData)

        toast.success('Lead cadastrado com sucesso!', {
          onClose: () => navigate('/'),
        })

        fetchLeads()
      }
    } catch (error) {
      toast.error('Algo deu errado!')
    } finally {
      actions.setSubmitting(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  return (
    <LeadsContext.Provider
      value={{
        leads,
        setLeads,
        initLeads,
        selectedLead,
        setSelectedLead,
        error,
        isLoading,
        currentStep,
        setCurrentStep,
        leadData,
        setLeadData,
        handleSubmit,
        fetchLeadById,
      }}
    >
      {children}
    </LeadsContext.Provider>
  )
}

export function useLeadsContext() {
  return useContext(LeadsContext)
}
