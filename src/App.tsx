import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes'
import { GlobalStyle } from './styles/global-styles'

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}

export default App
