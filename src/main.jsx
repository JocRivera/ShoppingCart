import { FilterProvider } from './context/filters.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <FilterProvider>
    <App />
  </FilterProvider>
)
