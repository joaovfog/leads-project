import React from 'react';
import InputMask from 'react-input-mask';
import { InputField, Label, Container, InputFieldContainer } from './styles';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  placeholder?: string;
  typeText: 'text' | 'number';
  mask?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({
  label,
  placeholder = '',
  typeText,
  mask,
  value,
  onChange,
  ...props
}: InputProps) => {
  const inputProps = {
    ...props,
    id: label,
    placeholder,
    type: typeText,
    value,
    onChange
  };

  return (
    <Container>
      <Label htmlFor={label}>{label}</Label>
      <div style={{ position: 'relative' }}>
        {mask ? (
          <InputMask
            mask={mask}
            value={value}
            onChange={onChange}
          >
            {(inputProps: any) => (
              <InputField {...inputProps} />
            )}
          </InputMask>
        ) : (
          <InputFieldContainer>
            <InputField {...inputProps} />
          </InputFieldContainer>
        )}
      </div>
    </Container>
  );
};
