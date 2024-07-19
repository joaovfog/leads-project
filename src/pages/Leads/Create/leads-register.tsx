import {
  MdOutlineArrowBack,
  MdOutlineLocalPhone,
  MdOutlinePerson,
} from 'react-icons/md'
import { Button, Card } from '../../../components'
import {
  CardContent,
  CardContentHeader,
  CardContentTitle,
  CardHeader,
  ContactStep,
  Container,
  ContentContainer,
  FormFooter,
  HorizontalLine,
  OuterBall,
  PersonalDataStep,
  StepBall,
  StepOne,
  StepTwo,
  Title,
} from './styles'
import { Form, Formik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { IMaritalStatus } from '../../../interfaces/IMaritalStatus'
import { loadMaritalStatus } from '../../../services/Leads/useLoadMaritalStatus'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { StepOneComponent } from './components/step-one'
import { StepTwoComponent } from './components/step-two'
import { useLeadsContext } from '../../context/leads.context'

const validationSchemaStep1 = Yup.object().shape({
  cpf: Yup.string().required('CPF é obrigatório'),
  nome: Yup.string().required('Nome do cliente é obrigatório'),
  nomeEstadoCivil: Yup.string().required('Estado civil é obrigatório'),
  nomeConjuge: Yup.string().when('nomeEstadoCivil', {
    is: (value: string) => {
      return value === '8f38'
    },
    then: (s) => s.required('Nome do cônjuge é obrigatório'),
    otherwise: (s) => s,
  }),
})

const validationSchemaStep2 = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: Yup.string().required('Telefone é um campo obrigatório'),
})

export const RegisterLeadsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const context = useLeadsContext()

  const [maritalStatus, setMaritalStatus] = useState<IMaritalStatus[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [triedToAdvance, setTriedToAdvance] = useState(false)

  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)

  if (!context) return <p>Context is not available</p>

  const {
    currentStep,
    setCurrentStep,
    leadData,
    setLeadData,
    selectedLead,
    setSelectedLead,
    handleSubmit,
    error,
    fetchLeadById,
  } = context

  const getValidationSchema = (step: number) =>
    step === 1 ? validationSchemaStep1 : validationSchemaStep2

  const handleNextStep = async (validateForm: () => Promise<any>) => {
    setTriedToAdvance(true)

    const errors = await validateForm()

    if (Object.keys(errors).length === 0) {
      setCurrentStep(2)
      setTriedToAdvance(false)
    } else {
      console.log(`Erro no step: ${currentStep}`)
    }
  }

  const fetchMaritalStatus = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await loadMaritalStatus()
      setMaritalStatus(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0)
      setSelectedLead(null)
      setLeadData({
        cpf: '',
        nome: '',
        nomeEstadoCivil: 'Solteiro(a)',
        nomeConjuge: '',
        email: '',
        telefone: '',
      })
      navigate('/')
    } else if (currentStep === 2) {
      setCurrentStep(1)
    }
  }

  useEffect(() => {
    fetchMaritalStatus()
  }, [fetchMaritalStatus])

  useEffect(() => {
    if (id) {
      fetchLeadById(id)
    }
  }, [id, fetchLeadById])

  useEffect(() => {
    if (selectedLead) {
      setLeadData({
        cpf: selectedLead.cpf,
        nome: selectedLead.nome,
        nomeEstadoCivil: selectedLead.nomeEstadoCivil,
        nomeConjuge: selectedLead.nomeConjuge,
        email: selectedLead.email,
        telefone: selectedLead.telefone,
      })
    }
  }, [selectedLead, setLeadData])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading leads</p>

  return (
    <Container>
      <Title>{selectedLead ? 'Editar Lead' : 'Novo Lead'}</Title>
      <ContentContainer>
        <Card>
          {currentStep !== 0 && (
            <Button
              variant="tertiary"
              icon={<MdOutlineArrowBack size={20} />}
              onClick={handleBack}
            >
              Voltar
            </Button>
          )}
          <CardHeader>
            <StepOne>
              <OuterBall isActive={currentStep === 1}>
                <StepBall
                  isActive={currentStep === 1}
                  isCompleted={currentStep > 1}
                >
                  1
                </StepBall>
              </OuterBall>
              <PersonalDataStep>Dados pessoais</PersonalDataStep>
            </StepOne>
            <HorizontalLine />
            <StepTwo>
              <OuterBall isActive={currentStep === 2}>
                <StepBall
                  isActive={currentStep === 2}
                  isCompleted={currentStep > 2}
                >
                  2
                </StepBall>
              </OuterBall>
              <ContactStep>Contato</ContactStep>
            </StepTwo>
          </CardHeader>
          <CardContent>
            <CardContentHeader>
              {currentStep === 1 ? (
                <>
                  <MdOutlinePerson color="#FF9933" size={24} />
                  <CardContentTitle>Dados pessoais</CardContentTitle>
                </>
              ) : (
                <>
                  <MdOutlineLocalPhone color="#FF9933" size={24} />
                  <CardContentTitle>Contato</CardContentTitle>
                </>
              )}
            </CardContentHeader>
            <Formik
              initialValues={leadData}
              validationSchema={getValidationSchema(currentStep)}
              onSubmit={handleSubmit}
              validateOnChange={validateAfterSubmit}
              validateOnBlur={false}
            >
              {({ values, handleChange, handleBlur, errors, validateForm }) => (
                <Form className="form">
                  {currentStep === 1 ? (
                    <StepOneComponent
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      maritalStatus={maritalStatus}
                      triedToAdvance={triedToAdvance}
                    />
                  ) : (
                    <StepTwoComponent
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                    />
                  )}
                  <div />
                  <FormFooter>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => navigate('/')}
                    >
                      Cancelar
                    </Button>
                    {currentStep === 1 ? (
                      <Button
                        type="button"
                        onClick={() => handleNextStep(validateForm)}
                      >
                        Avançar
                      </Button>
                    ) : (
                      <Button type="button" onClick={async () => {
                        setValidateAfterSubmit(true)
                        const error = await validateForm()

                        if (Object.keys(error).length === 0) {
                          handleSubmit(values, validateForm)
                        } else {
                          console.log(`Erro no step: ${currentStep}`)
                        }
                      }}>
                        {selectedLead ? 'Salvar' : 'Cadastrar'}
                      </Button>
                    )}
                  </FormFooter>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </ContentContainer>
    </Container>
  )
}
