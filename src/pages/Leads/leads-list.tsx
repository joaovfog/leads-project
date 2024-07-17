import { FaPlus } from "react-icons/fa"
import { 
    CardFooter, 
    CardHeader, 
    Container, 
    ContentContainer, 
    FirstRowHeader, 
    HeaderContainer, 
    SecondRowHeader, 
    TableActions, 
    TableCell, 
    TableContainer, 
    TableHeader, 
    TableHeaderCell, 
    TableRow, 
    Title 
} from "./styles"
import { Button, Card, Input } from "../../components"
import { LeadsListProvider, useLeadsListContext } from "../context/leads-list.context"
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md"
import { formatCPF } from "../../utils/formatCPF"
import { useState } from "react"

const LeadsTable = () => {
    const context = useLeadsListContext()

    if (!context) return <p>Context is not available</p>

    const { leads, error, isLoading } = context

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading leads</p>

    const [cpfFilter, setCpfFilter] = useState<string>("")
    const [nameFilter, setNameFilter] = useState<string>("")
    const [filteredLeads, setFilteredLeads] = useState(leads)

    const handleFilter = () => {
        const filters: { cpf?: string; nome?: string } = {}

        if (cpfFilter) filters.cpf = cpfFilter.replace(/\D/g, "")
        if (nameFilter) filters.nome = nameFilter

        const newFilteredLeads = leads.filter((lead) => {
            let matchesCPF = true
            let matchesName = true

            if (filters.cpf) {
                matchesCPF = lead.cpf.includes(filters.cpf)
            }
            if (filters.nome) {
                matchesName = lead.nome.toLowerCase().includes(filters.nome.toLowerCase())
            }

            return matchesCPF && matchesName
        })

        setFilteredLeads(newFilteredLeads)
    }

    const clearFilters = () => {
        setCpfFilter("")
        setNameFilter("")
        setFilteredLeads(leads)
    }

    return (
        <Container>
            <HeaderContainer>
                <FirstRowHeader>
                    <Title>Consulta de Leads</Title>
                    <Button variant="primary" icon={<FaPlus />}>
                        Novo lead
                    </Button>
                </FirstRowHeader>
                <SecondRowHeader>
                    <Card>
                        <CardHeader>
                            <Input 
                                typeText="text" 
                                label="CPF"
                                placeholder="Digite o CPF do cliente"
                                mask="999.999.999-99"
                                value={cpfFilter}
                                onChange={(e) => setCpfFilter(e.target.value)}
                            />
                            <Input 
                                typeText="text" 
                                label="Nome do cliente" 
                                placeholder="Digite o nome do cliente"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                            />
                        </CardHeader>
                        <CardFooter>
                            <Button variant="secondary" onClick={clearFilters}>Limpar tudo</Button>
                            <Button onClick={handleFilter}>Filtrar</Button>
                        </CardFooter>
                    </Card>
                </SecondRowHeader>
            </HeaderContainer>
            <ContentContainer>
                <Card>
                    <TableContainer>
                        <TableHeader>
                            <TableRow isEven={false}>
                                <TableHeaderCell>Nome</TableHeaderCell>
                                <TableHeaderCell>CPF</TableHeaderCell>
                                <TableHeaderCell>E-mail</TableHeaderCell>
                                <TableHeaderCell>Telefone</TableHeaderCell>
                                <TableHeaderCell>Ações</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <tbody>
                            {filteredLeads.map((lead, index) => (
                                <TableRow key={lead.id} isEven={index % 2 === 0}>
                                    <TableCell>{lead.nome}</TableCell>
                                    <TableCell>{formatCPF(lead.cpf)}</TableCell>
                                    <TableCell>{lead.email}</TableCell>
                                    <TableCell>{lead.telefone || "-"}</TableCell>
                                    <TableCell>
                                    <TableActions>
                                        <Button icon={<MdOutlineEdit />} variant="tertiary" />
                                        <Button icon={<MdDeleteOutline />} variant="tertiary" />
                                    </TableActions>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </TableContainer>
                </Card>
            </ContentContainer>
        </Container>
    )
}

export const LeadsListPage = () => (
    <LeadsListProvider>
        <LeadsTable />
    </LeadsListProvider>
)
