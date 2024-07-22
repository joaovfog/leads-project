import React from 'react'
import InputMask from 'react-input-mask'
import { InputField, Label, Container, InputFieldContainer } from './styles'

type InputProps = React.ComponentProps<'input'> & {
  label: string
  placeholder?: string
  typeText: 'text' | 'number'
  mask?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder = '',
  typeText,
  mask,
  value,
  onChange,
  onBlur,
  ...props
}: InputProps) => {
  return (
    <Container>
      <Label htmlFor={props.id}>{label}</Label>
      <div style={{ position: 'relative' }}>
        {mask ? (
          <InputMask
            mask={mask}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          >
            {(maskProps: React.InputHTMLAttributes<HTMLInputElement>) => (
              <InputField {...maskProps} placeholder={placeholder} />
            )}
          </InputMask>
        ) : (
          <InputFieldContainer>
            <InputField
              {...props}
              type={typeText}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
            />
          </InputFieldContainer>
        )}
      </div>
    </Container>
  )
}
