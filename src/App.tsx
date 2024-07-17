import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes'
import { GlobalStyle } from './styles/global-styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
