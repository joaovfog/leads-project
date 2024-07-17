import React from 'react';
import InputMask from 'react-input-mask';
import { InputField, Label, Container, InputFieldContainer } from './styles';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  placeholder: string;
  typeText: 'text' | 'number';
  mask?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  placeholder = '',
  typeText,
  mask,
  ...props
}: InputProps) => {
  const inputProps = {
    ...props,
    id: label,
    placeholder,
    type: typeText,
  };

  return (
    <Container>
      <Label>{label}</Label>
      <div style={{ position: 'relative' }}>
        {mask ? (
          <InputMask
            mask={mask}
            value={props.value}
            onChange={props.onChange}
            {...inputProps}
          >
            {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
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
