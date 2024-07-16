import { FaPlus } from "react-icons/fa"
import { CardFooter, CardHeader, Container, ContentContainer, FirstRowHeader, HeaderContainer, SecondRowHeader, Title } from "./styles"
import { Button, Card, Input, Table } from "../../components"

export const LeadsList = () => {
    return (
        <Container>
            <HeaderContainer>
                <FirstRowHeader>
                    <Title>Consulta de Leads</Title>
                    <Button variant="primary" icon={<FaPlus />}>
                        Novo lead
                    </Button>
                </FirstRowHeader>
                <SecondRowHeader>
                    <Card>
                        <CardHeader>
                            <Input typeText="text" label="CPF" placeholder="Digite o CPF do cliente" />
                            <Input typeText="text" label="Nome do cliente" placeholder="Digite o nome do cliente" />
                        </CardHeader>
                        <CardFooter>
                            <Button variant="secondary">Limpar tudo</Button>
                            <Button>Filtrar</Button>
                        </CardFooter>
                    </Card>
                </SecondRowHeader>
            </HeaderContainer>
            <ContentContainer>
                <Card>
                    <Table data={[]} />
                </Card>
            </ContentContainer>
        </Container>
    )
}