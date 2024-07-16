import styled, { css } from "styled-components";

const buttonStyles = {
    primary: css`
        background-color: #198CFF;
        color: #fff;
    `,

    secondary: css`
        background-color: #fff;
        color: #198CFF;
    `,
}

export const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid #198CFF;
  border-radius: 4px;
  cursor: pointer;
  
  ${({ variant }) => buttonStyles[variant]}
  
  &:hover {
    opacity: 0.8;
  }
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`
