import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App.tsx'
import './index.css'
import { Providers } from './providers';
import { Provider } from 'react-redux'
import { store, persistor } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <HashRouter>
          <Providers>
            <App />
          </Providers>
        </HashRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
)
