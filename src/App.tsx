import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { Router } from './routes'
import GlobalStyle from './styles/global'
import { CyclesContextProvider } from './contexts/CyclesContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
