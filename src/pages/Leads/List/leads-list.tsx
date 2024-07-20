import { FaPlus } from 'react-icons/fa'
import {
  CardFooter,
  CardHeader,
  Container,
  ContentContainer,
  FirstRowHeader,
  HeaderContainer,
  SecondRowHeader,
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title,
} from './styles'
import { Button, Card, Input } from '../../../components'
import { useLeadsContext } from '../../context/leads.context'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { formatCPF } from '../../../utils/formatCPF'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPhoneNumber } from '../../../utils/formatPhone'
import { ILeads } from '../../../interfaces/ILeads'
import { deleteLead } from '../../../services/Leads/useDeleteLead'
import { toast } from 'react-toastify'

export const LeadsListPage = () => {
  const context = useLeadsContext()
  const navigate = useNavigate()

  const [cpfFilter, setCpfFilter] = useState<string>('')
  const [nameFilter, setNameFilter] = useState<string>('')

  if (!context) return <p>Context is not available</p>

  const {
    leads,
    setLeads,
    initLeads,
    setSelectedLead,
    error,
    isLoading,
    setCurrentStep,
  } = context

  const handleFilter = () => {
    const filters: { cpf?: string; nome?: string } = {}

    if (cpfFilter) filters.cpf = cpfFilter.replace(/\D/g, '')
    if (nameFilter) filters.nome = nameFilter

    const newFilteredLeads = initLeads.filter((lead) => {
      const matchesCPF = filters.cpf ? lead.cpf.includes(filters.cpf) : true
      const matchesName = filters.nome
        ? lead.nome.toLowerCase().includes(filters.nome.toLowerCase())
        : true

      return matchesCPF && matchesName
    })

    setLeads(newFilteredLeads)
  }

  const handleEdit = (lead: ILeads) => {
    setSelectedLead(lead)
    setCurrentStep(1)
    navigate(`/edit/${lead.id}`)
  }

  const handleDelete = async (lead: ILeads) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o lead ${lead.nome}?`
    )

    if (confirmed) {
      try {
        await deleteLead(lead.id)

        toast.success('Lead excluído com sucesso!')

        setLeads((prevLeads: any[]) =>
          prevLeads.filter((l) => l.id !== lead.id)
        )
      } catch (error) {
        toast.error('Algo deu errado!')
      }
    }
  }

  const clearFilters = () => {
    setCpfFilter('')
    setNameFilter('')
    setLeads(initLeads)
  }

  useEffect(() => {
    setLeads(initLeads)
  }, [initLeads, setLeads])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading leads</p>

  return (
    <Container>
      <HeaderContainer>
        <FirstRowHeader>
          <Title>Consulta de Leads</Title>
          <Button
            variant="primary"
            icon={<FaPlus />}
            onClick={() => {
              setSelectedLead(null)
              setCurrentStep(1)
              navigate('/create')
            }}
          >
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
              <Button variant="secondary" onClick={clearFilters}>
                Limpar tudo
              </Button>
              <Button onClick={handleFilter}>Filtrar</Button>
            </CardFooter>
          </Card>
        </SecondRowHeader>
      </HeaderContainer>
      <ContentContainer>
        <Card>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow isEven={false}>
                  <TableHeaderCell width="25%">Nome</TableHeaderCell>
                  <TableHeaderCell width="20%">CPF</TableHeaderCell>
                  <TableHeaderCell width="25%">E-mail</TableHeaderCell>
                  <TableHeaderCell width="20%">Telefone</TableHeaderCell>
                  <TableHeaderCell width="10%">Ações</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead, index) => (
                  <TableRow key={lead.id} isEven={index % 2 === 0}>
                    <TableCell width="25%">{lead.nome}</TableCell>
                    <TableCell width="20%">{formatCPF(lead.cpf)}</TableCell>
                    <TableCell width="25%">{lead.email}</TableCell>
                    <TableCell width="20%">
                      {formatPhoneNumber(lead.telefone) || '-'}
                    </TableCell>
                    <TableCell width="10%">
                      <TableActions>
                        <Button
                          icon={<MdOutlineEdit />}
                          variant="tertiary"
                          onClick={() => handleEdit(lead)}
                        />
                        <Button
                          icon={<MdDeleteOutline />}
                          variant="tertiary"
                          onClick={() => handleDelete(lead)}
                        />
                      </TableActions>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </ContentContainer>
    </Container>
  )
}
