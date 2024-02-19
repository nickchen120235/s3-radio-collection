import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { setChonkyDefaults } from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'

setChonkyDefaults({ iconComponent: ChonkyIconFA })
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
