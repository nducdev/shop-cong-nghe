import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { DarkModeContextProvider } from './context/darkModeContext'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <DarkModeContextProvider>
                    <App />
                </DarkModeContextProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
