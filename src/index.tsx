import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { setChonkyDefaults } from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import { SnackbarProvider } from 'notistack'
import 'react-h5-audio-player/lib/styles.css'

setChonkyDefaults({ iconComponent: ChonkyIconFA })
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <CssBaseline />
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)
