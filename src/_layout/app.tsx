import { Outlet } from "react-router-dom"
import { Content, MainContainer } from "./styles"
import { Header } from "../components"

export const AppLayout = () => {
    return (
        <MainContainer>
            <Header />
            <Content>
                <Outlet />
            </Content>
        </MainContainer>
    )
}