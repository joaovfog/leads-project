import { Input, Select } from "../../../../components"
import { ErrorMessage, InputField } from "../styles"
import { IMaritalStatus } from "../../../../interfaces/IMaritalStatus"

type StepOneProps = {
    values: {
        cpf: string
        nome: string
        nomeEstadoCivil: string
        nomeConjugue: string
    }
    touched: any
    errors: any
    maritalStatus: IMaritalStatus[]
    handleChange: any
    handleBlur: any
}

export const StepOneComponent = ({ 
    values,
    handleChange, 
    handleBlur,
    touched,
    errors,
    maritalStatus,
}: StepOneProps) => {
    return (
        <>
            <InputField>
                <Input 
                    typeText="text" 
                    label="CPF" 
                    placeholder="Digite o CPF do cliente"
                    mask="999.999.999-99"
                    id="cpf"
                    name="cpf"
                    value={values.cpf}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.cpf || errors.cpf ? <ErrorMessage>{errors.cpf}</ErrorMessage> : null}
            </InputField>
            <InputField>
                <Input 
                    typeText="text" 
                    label="Nome do cliente" 
                    placeholder="Digite o nome do cliente"
                    id="nome"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.nome || errors.nome ? <ErrorMessage>{errors.nome}</ErrorMessage> : null}
            </InputField> 
            <InputField>                                    
                <Select
                    label="Estado civil"
                    options={maritalStatus.map(status => ({
                        id: status.nomeEstadoCivil,
                        nomeEstadoCivil: status.nomeEstadoCivil,
                    }))}
                    id="nomeEstadoCivil"
                    name="nomeEstadoCivil"
                    value={values.nomeEstadoCivil}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.nomeEstadoCivil || errors.nomeEstadoCivil ? <ErrorMessage>{errors.nomeEstadoCivil}</ErrorMessage> : null}
            </InputField> 
            <Input 
                typeText="text" 
                label="Nome do cônjuge" 
                placeholder="Digite o nome do cônjuge"
                id="nomeConjugue"
                name="nomeConjugue"
                value={values.nomeConjugue}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </>
    )
}