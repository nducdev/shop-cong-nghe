import { createContext, useState } from 'react'

export const QuantityContext = createContext()

export const QuantityProvider = ({ children }) => {
    const [quantity, setQuantity] = useState(1)

    return <QuantityContext.Provider value={{ quantity, setQuantity }}>{children}</QuantityContext.Provider>
}
