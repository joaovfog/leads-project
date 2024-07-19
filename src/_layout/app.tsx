import { Outlet } from 'react-router-dom'
import { Content, MainContainer } from './styles'
import { Header } from '../components'
import { LeadsProvider } from '../pages/context/leads.context'

export const AppLayout = () => {
  return (
    <MainContainer>
      <Header />
      <Content>
        <LeadsProvider>
          <Outlet />
        </LeadsProvider>
      </Content>
    </MainContainer>
  )
}
