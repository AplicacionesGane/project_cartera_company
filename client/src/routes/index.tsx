import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Root from './root'

// TODO: PAGES
const NotFound = lazy(() => import('../pages/NotFound'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Detallado = lazy(() => import('../pages/Home'))
const BasesPage = lazy(() => import('../pages/BasesPage'))
const BasesDetalle = lazy(() => import('../pages/BasesDetalle'))
const AsignarNewBase = lazy(() => import('../pages/AsignarNewBase'))
const RecaudoDetail = lazy(() => import('../pages/RecaudoDetail'))
const ReporteRecaudo = lazy(() => import('../pages/ReporteRecaudo'))
const ReportOracle = lazy(() => import('../pages/ReportOracle'))
const SeleccionReportes = lazy(() => import('../pages/SeleccionReportes'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: 'detallado',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Detallado />
          </Suspense>
        )
      },
      {
        path: 'bases',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BasesPage />
          </Suspense>
        )
      },
      {
        path: 'base/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BasesDetalle />
          </Suspense>
        )
      },
      {
        path: 'asignarNuevaBase',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AsignarNewBase />
          </Suspense>
        )
      },
      {
        path: 'recaudo/:id/:estado',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RecaudoDetail />
          </Suspense>
        )
      },
      {
        path: '/Reportes',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SeleccionReportes />
          </Suspense>
        )
      },
      {
        path: '/trasnportes',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ReporteRecaudo />
          </Suspense>
        )
      },
      {
        path: '/consolidadoVenta',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ReportOracle />
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
])

export { router }
