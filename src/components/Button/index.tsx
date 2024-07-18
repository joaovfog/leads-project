import { ButtonHTMLAttributes } from "react";
import { IconWrapper, StyledButton } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'tertiary'
    icon?: React.ReactNode
}

export const Button = ({ variant = 'primary', children, icon, ...rest }: ButtonProps) => {
    return (
        <StyledButton variant={variant} {...rest}>
            {children}
            {icon && <IconWrapper>{icon}</IconWrapper>}
        </StyledButton>
    )
}