import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import router from './app/router/router'
import { store } from './shared/lib/store'
import ToastProvider from './shared/toast/toast-provider/toast-provider'
import ToastContainer from './shared/toast/ui/toast-container'

import './index.css'


createRoot(document.querySelector('#root')!).render(
  <Provider store={store}>
    <ToastProvider>
      <>
        <RouterProvider router={router} />
        <ToastContainer />
      </>
    </ToastProvider>
  </Provider>
)
