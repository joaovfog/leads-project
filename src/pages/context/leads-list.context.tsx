import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { loadLeads } from "../../services/Leads/useLoadLeads";
import { ILeads } from "../../interfaces/ILeads";

const LeadsListContext = createContext<LeadsListContextType | null>(null)

interface LeadsListProviderProps {
    children: ReactNode;
}

interface LeadsListContextType {
    data: ILeads;
    error: Error | null;
    isLoading: boolean;
}

export const LeadsListProvider: React.FC<LeadsListProviderProps> = ({ children }: LeadsListProviderProps) => {
    const { data, error, isLoading } = useQuery({ queryKey: ['leads'], queryFn: loadLeads })

    return (
        <LeadsListContext.Provider
            value={{ data, error, isLoading }}
        >
            {children}
        </LeadsListContext.Provider>
    )
}

export function useLeadsListContext() {
    return useContext(LeadsListContext)
}
