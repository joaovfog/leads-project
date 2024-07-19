import { Input } from "../../../../components"
import { ErrorMessage, InputField } from "../styles"

type StepTwoProps = {
    values: {
        email: string
        telefone: string
    }
    errors: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void
}

export const StepTwoComponent = ({
    values, 
    errors, 
    handleChange, 
    handleBlur 
}: StepTwoProps) => {
    return (
        <>
            <InputField>
                <Input 
                    typeText="text" 
                    label="E-mail" 
                    placeholder="Digite o e-mail do cliente"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
            </InputField>
            <InputField>
                <Input 
                    typeText="text" 
                    label="Telefone" 
                    placeholder="Digite o telefone do cliente"
                    mask="(99) 9 9999-9999"
                    id="telefone"
                    name="telefone"
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.telefone ? <ErrorMessage>{errors.telefone}</ErrorMessage> : null}
            </InputField>
        </>
    )
}