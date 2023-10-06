import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './layouts'
import routes from 'constants/routes'
import SpotPage from '../pages/SpotPage/index'
import ReportsPage from 'pages/ReportsPage'
import DerivativesPage from 'pages/DerivativesPage'

interface HOCProps {
  children: JSX.Element
  isLoggedIn: boolean
}

const PrivateRoute = ({ children, isLoggedIn }: HOCProps) => {
  return isLoggedIn ? children : <Navigate to="/home" />
}

const PublicRoute = ({ children, isLoggedIn }: HOCProps) => {
  return isLoggedIn ? <Navigate to="/home" /> : children
}

export const AppRouter = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path={routes.ROUTE_SPOT} element={<SpotPage />} />
        <Route path={routes.ROUTE_DERIVATIVES} element={<DerivativesPage />} />
        <Route path={routes.ROUTE_REPORTS} element={<ReportsPage />} />
        <Route path="*" element={<Navigate to={routes.ROUTE_SPOT} />} />
      </Routes>
    </Layout>
  )
}
