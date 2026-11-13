import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Find the root HTML element and mount the React application into it.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
      BrowserRouter enables client-side routing throughout the app,
      allowing pages like /tickets and /tickets/1 to work without
      performing a full browser page reload.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)