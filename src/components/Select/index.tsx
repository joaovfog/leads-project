import React from 'react'
import { Container, Label, SelectField } from './styles'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string
    options: { id: string; nomeEstadoCivil: string }[]
}
  
export const Select: React.FC<SelectProps> = ({
    label,
    options,
    ...props
}: SelectProps) => {
    return (
      <Container>
        <Label>{label}</Label>
        <SelectField {...props}>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nomeEstadoCivil}
            </option>
          ))}
        </SelectField>
      </Container>
    )
}
