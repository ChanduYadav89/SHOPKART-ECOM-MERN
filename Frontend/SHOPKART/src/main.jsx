import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './Styles/index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

// 1. Import Redux Provider and your specific store config
import { Provider } from 'react-redux'
import { store } from './Redux/store' // <-- Double check this path matches your project folder structure!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap everything inside the Redux Provider */}
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>  
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)