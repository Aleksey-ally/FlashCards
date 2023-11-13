import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { bounce } from '@/pages/utils/toastify-options/toastify-options.ts'
import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={bounce}
      />
    </Provider>
  )
}
