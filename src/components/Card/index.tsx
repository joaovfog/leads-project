import { Container } from "./styles"

type CardProps = {
    children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
    return (
        <Container>{children}</Container>
    )
}