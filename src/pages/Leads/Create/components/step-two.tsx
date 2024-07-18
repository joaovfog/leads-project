import { Input } from "../../../../components"
import { ErrorMessage, InputField } from "../styles"

type StepTwoProps = {
    values: {
        email: string
        telefone: string
    }
    touched: any
    errors: any
    handleChange: any
    handleBlur: any
}

export const StepTwoComponent = ({
    values, 
    touched, 
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
                {touched.email || errors.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
            </InputField>
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
        </>
    )
}