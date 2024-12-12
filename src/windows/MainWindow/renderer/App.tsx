import { MemoryRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { HomePage } from './pages/home'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      { children }
    </div>
  )
}

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchOnWindowFocus: true,
        staleTime: Number.POSITIVE_INFINITY,
      }}
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <div>
            <Routes>
              <Route path="/"  element={<HomePage />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}
