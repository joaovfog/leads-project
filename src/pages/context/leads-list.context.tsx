import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react"
import { loadLeads } from "../../services/Leads/useLoadLeads"
import { ILeads } from "../../interfaces/ILeads"

const LeadsListContext = createContext<LeadsListContextType | null>(null)

interface LeadsListProviderProps {
    children: ReactNode
}

interface LeadsListContextType {
    leads: ILeads[]
    setLeads: any
    initLeads: ILeads[]
    error: Error | null
    isLoading: boolean
}

export const LeadsListProvider: React.FC<LeadsListProviderProps> = ({ children }: LeadsListProviderProps) => {
    const [leads, setLeads] = useState<ILeads[]>([])
    const [initLeads, setInitLeads] = useState<ILeads[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
    
    useEffect(() => {
      fetchLeads()
    }, [fetchLeads])

    return (
        <LeadsListContext.Provider 
          value={{ 
            leads, 
            setLeads,
            initLeads,
            error, 
            isLoading
          }}>
            {children}
        </LeadsListContext.Provider>
    )
}

export function useLeadsListContext() {
    return useContext(LeadsListContext)
}
