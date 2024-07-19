import { FaPlus } from 'react-icons/fa'
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
                  <TableCell>
                    {formatPhoneNumber(lead.telefone) || '-'}
                  </TableCell>
                  <TableCell>
                    <TableActions>
                      <Button
                        icon={<MdOutlineEdit />}
                        variant="tertiary"
                        onClick={() => handleEdit(lead)}
                      />
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
