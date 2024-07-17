import { IconWrapper, StyledButton } from "./styles";

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'tertiary'
    children?: React.ReactNode;
    icon?: React.ReactNode
    onClick?: () => void;
}

export const Button = ({ variant = 'primary', children, icon, onClick }: ButtonProps) => {
    return (
        <StyledButton variant={variant} onClick={onClick}>
            {children}
            {icon && <IconWrapper>{icon}</IconWrapper>}
        </StyledButton>
    )
}