import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './auth/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { router } from './routes'
import axios from 'axios'
import './index.css'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthProvider>
)
