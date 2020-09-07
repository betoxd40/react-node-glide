import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Routes from '@routes'
import { Navbar } from '@components'

const GlobalStyle = createGlobalStyle`
     html, body {
        width: 100%;
        height: 100%;
        font-family: "Roboto";
        margin: 0px;
        padding: 0px;
        background: #fafafa;
    }
`

const defaultTheme = {}

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={{ ...defaultTheme }}>
      <Navbar />
      <Routes />
    </ThemeProvider>
  </>
)

export default App
