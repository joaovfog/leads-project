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

const LeadsContext = createContext<LeadsContextType | null>(null)

interface LeadsProviderProps {
  children: ReactNode
}

interface FormData {
  cpf: string;
  nome: string;
  nomeEstadoCivil: string;
  nomeConjuge: string;
  email: string;
  telefone: string;
}

interface LeadsContextType {
  leads: ILeads[]
  setLeads: any
  initLeads: ILeads[]
  error: Error | null
  isLoading: boolean
  currentStep: number
  setCurrentStep: (step: number) => void
  leadData: FormData
  setLeadData: (data: FormData) => void
  handleSubmit: (values: FormData, actions: any) => Promise<void>
}

export const LeadsProvider: React.FC<LeadsProviderProps> = ({
  children,
}: LeadsProviderProps) => {
  const navigate = useNavigate()
  
  const [leads, setLeads] = useState<ILeads[]>([])
  const [initLeads, setInitLeads] = useState<ILeads[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)

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

  const handleSubmit = async (values: FormData, actions: FormikHelpers<FormData>) => {
    try {
      const leadData = {
        ...values,
        cpf: values.cpf.replace(/[^\d]/g, ''),
        telefone: values.telefone.replace(/[^\d]/g, '')
      }

      await useCreateLead(leadData)

      toast.success('Lead cadastrado com sucesso!', {
        onClose: () => navigate('/')
      })
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
        error,
        isLoading,
        currentStep,
        setCurrentStep,
        leadData,
        setLeadData,
        handleSubmit,
      }}
    >
      {children}
    </LeadsContext.Provider>
  )
}

export function useLeadsContext() {
  return useContext(LeadsContext)
}
