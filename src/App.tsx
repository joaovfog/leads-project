import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes'
import { GlobalStyle } from './styles/global-styles'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
