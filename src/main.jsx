import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import NotFound from './components/NotFound'
import './index.scss'
import store from './redux/store'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#f5f5fa',
            fontSize: '16px',
            fontWeight: 400,
            color: '#38383D',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<App />}
          ></Route>
          <Route
            path="*"
            element={<NotFound />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
)
