import { AuthProvider } from './auth/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { router } from './routes'
import axios from 'axios'
import './index.css'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
