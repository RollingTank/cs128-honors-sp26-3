import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CreateApp from './create/App.jsx'
import BrowseApp from './browse/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateApp />} />
        <Route path="/browse" element={<BrowseApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
