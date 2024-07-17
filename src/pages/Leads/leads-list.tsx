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

const LeadsTable = () => {
    const context = useLeadsListContext()

    if (!context) return <p>Context is not available</p>

    const { data: leads, error, isLoading } = context

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading leads</p>

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
                            />
                            <Input 
                                typeText="text" 
                                label="Nome do cliente" 
                                placeholder="Digite o nome do cliente"
                            />
                        </CardHeader>
                        <CardFooter>
                            <Button variant="secondary">Limpar tudo</Button>
                            <Button>Filtrar</Button>
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
                            {leads.map((lead, index) => (
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
