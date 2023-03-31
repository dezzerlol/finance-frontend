import { MantineProvider } from '@mantine/core'
import { AppRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'

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
