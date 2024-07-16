import { Container } from "./styles"
import logo from '../../assets/logo.png'

export const Header = () => {
    return (
        <Container>
            <img src={logo} alt="logotipo" />
        </Container>
    )
}