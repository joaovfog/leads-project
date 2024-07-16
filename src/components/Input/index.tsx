import { InputField, Label, TextInputContainer } from "./styles"

type InputProps = React.ComponentProps<'input'> & {
  label: string
  placeholder: string
  typeText:
    | 'text'
    | 'number'
}

export const Input = ({
  label,
  placeholder = '',
  typeText,
  ...props
}: InputProps) => {
  return (
    <>
      <TextInputContainer>
        <Label>
            {label}
        </Label>
        <div style={{ position: 'relative' }}>
          <InputField
            {...props}
            id={label}
            placeholder={placeholder}
            type={typeText}
          />
        </div>
      </TextInputContainer>
    </>
  )
}
