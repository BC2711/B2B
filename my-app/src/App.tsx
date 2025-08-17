import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AdminAuthRoutes from './routes/AdminAuthRoutes'
import React from 'react'
import Admin from './routes/Admin'

function App() {
  // Error Boundary Component
  const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        {children}
      </React.Suspense>
    );
  };
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/*" element={<AdminAuthRoutes />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
