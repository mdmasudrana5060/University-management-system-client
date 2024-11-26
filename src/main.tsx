import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './routes/routes.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import './index.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>

  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <RouterProvider router={router}/>
      </PersistGate>

  </Provider>
  <Toaster/>
  </StrictMode>,
)
