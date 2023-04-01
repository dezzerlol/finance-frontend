import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
