import { MdOutlineArrowBack, MdOutlineLocalPhone, MdOutlinePerson } from "react-icons/md"
import { Button, Card, Input, Select } from "../../../components"
import { CardContent, CardContentHeader, CardContentTitle, CardHeader, ContactStep, Container, ContentContainer, ErrorMessage, FormFooter, HorizontalLine, InputField, OuterBall, PersonalDataStep, StepBall, StepOne, StepTwo, Title } from "./styles"
import { Form, Formik, FormikHelpers } from "formik"
import { useCallback, useEffect, useState } from "react"
import { IMaritalStatus } from "../../../interfaces/IMaritalStatus"
import { loadMaritalStatus } from "../../../services/Leads/useLoadMaritalStatus"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import { useCreateLead } from "../../../services/Leads/useCreateLead"
import { toast } from "react-toastify"
import { StepOneComponent } from "./components/step-one"
import { StepTwoComponent } from "./components/step-two"

interface FormData {
    cpf: string
    nome: string
    nomeEstadoCivil: string
    nomeConjuge: string
    email: string
    telefone: string
}

const validationSchemaStep1 = Yup.object().shape({
    cpf: Yup.string().required("CPF é obrigatório"),
    nome: Yup.string().required("Nome do cliente é obrigatório"),
    nomeEstadoCivil: Yup.string().required("Estado civil é obrigatório"),
    nomeConjuge: Yup.string().when('nomeEstadoCivil', {
        is: (value: string) => {
            return value === 'Casado(a)'
        },
        then: (s) => s.required("Nome do cônjuge é obrigatório"),
        otherwise: (s) => s,
    }),
})

const validationSchemaStep2 = Yup.object().shape({
    email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
    telefone: Yup.string().required("Telefone é um campo obrigatório"),
})

export const CreateLeadsPage = () => {
    const navigate = useNavigate()

    const [currentStep, setCurrentStep] = useState<number>(1)
    const [maritalStatus, setMaritalStatus] = useState<IMaritalStatus[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [triedToAdvance, setTriedToAdvance] = useState(false)
    const [showStepTwoErrors, setShowStepTwoErrors] = useState(false)

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

    const getValidationSchema = (step: number) => {
        return step === 1 ? validationSchemaStep1 : validationSchemaStep2
    }

    const handleNextStep = async (validateForm: () => Promise<any>) => {
        setTriedToAdvance(true);

        const errors = await validateForm()
    
        if (Object.keys(errors).length === 0) {
            setCurrentStep(2)
        } else {
            console.log(`erro no step: ${currentStep}`)
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

    useEffect(() => {
        fetchMaritalStatus()
    }, [fetchMaritalStatus])

    return (
        <Container>
            <Title>Consulta de Leads</Title>
            <ContentContainer>
                <Card>
                    <Button 
                        variant="tertiary" 
                        icon={<MdOutlineArrowBack size={20} />}
                        onClick={() => {
                            if (currentStep === 2) {
                                return setCurrentStep(1)
                            }

                            navigate("/")
                        }}
                    >
                        Voltar
                    </Button>
                    <CardHeader>
                        <StepOne>
                            <OuterBall isActive={currentStep === 1}>
                                <StepBall isActive={currentStep === 1} isCompleted={currentStep > 1}>
                                    1
                                </StepBall>
                            </OuterBall>
                            <PersonalDataStep>Dados pessoais</PersonalDataStep>
                        </StepOne>
                        <HorizontalLine />
                        <StepTwo>
                            <OuterBall isActive={currentStep === 2}>
                                <StepBall isActive={currentStep === 2} isCompleted={currentStep > 2}>
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
                            initialValues={{
                                cpf: "",
                                nome: "",
                                nomeEstadoCivil: "Solteiro(a)",
                                nomeConjuge: "",
                                email: "",
                                telefone: "",
                            }}
                            validationSchema={getValidationSchema(currentStep)}
                            onSubmit={handleSubmit}
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
                                            onClick={() => navigate("/")}
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
                                            <Button type="submit">Cadastrar</Button>
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