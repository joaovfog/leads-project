import { Input, Select } from '../../../../components'
import { ErrorMessage, InputField } from '../styles'
import { IMaritalStatus } from '../../../../interfaces/IMaritalStatus'

type StepOneProps = {
  values: {
    cpf: string
    nome: string
    nomeEstadoCivil: string
    nomeConjuge: string
  }
  errors: any
  maritalStatus: IMaritalStatus[]
  handleChange: any
  handleBlur: any
  triedToAdvance: boolean
}

export const StepOneComponent = ({
  values,
  handleChange,
  handleBlur,
  errors,
  maritalStatus,
  triedToAdvance,
}: StepOneProps) => {
  const isMarried = values.nomeEstadoCivil === '8f38'

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
        {triedToAdvance && errors.cpf ? (
          <ErrorMessage>{errors.cpf}</ErrorMessage>
        ) : null}
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
        {triedToAdvance && errors.nome ? (
          <ErrorMessage>{errors.nome}</ErrorMessage>
        ) : null}
      </InputField>
      <InputField>
        <Select
          label="Estado civil"
          options={maritalStatus.map((status) => ({
            id: status.id,
            nomeEstadoCivil: status.nomeEstadoCivil,
          }))}
          id="nomeEstadoCivil"
          name="nomeEstadoCivil"
          value={values.nomeEstadoCivil}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {triedToAdvance && errors.nomeEstadoCivil ? (
          <ErrorMessage>{errors.nomeEstadoCivil}</ErrorMessage>
        ) : null}
      </InputField>
      <InputField>
        <Input
          typeText="text"
          label="Nome do cônjuge"
          placeholder="Digite o nome do cônjuge"
          id="nomeConjuge"
          name="nomeConjuge"
          value={values.nomeConjuge}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={!isMarried}
        />
        {triedToAdvance && errors.nomeConjuge ? (
          <ErrorMessage>{errors.nomeConjuge}</ErrorMessage>
        ) : null}
      </InputField>
    </>
  )
}
