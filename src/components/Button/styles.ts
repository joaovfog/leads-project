import styled, { css } from "styled-components";

export const StyledButton = styled.button<{ variant: 'primary' | 'secondary' | 'tertiary' }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;

    ${({ variant }) => 
        variant === 'primary' && css`
            border: 2px solid #198CFF;
            background-color: #198CFF;
            color: white;

            &:hover {
                border: 2px solid #126bc3;
                background-color: #126bc3;
            }
        `
    }

    ${({ variant }) => 
        variant === 'secondary' && css`
            border: 2px solid #fff;
            background-color: #fff;
            color: #198CFF;

            &:hover {
                background-color: #f3f3f3;
            }
        `
    }

    ${({ variant }) => 
        variant === 'tertiary' && css`
            border: none;
            background-color: transparent;
            color: inherit;
        `
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        
        &:hover {
            background-color: #198CFF;
            border: 2px solid #198CFF;
        }
    }
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`
