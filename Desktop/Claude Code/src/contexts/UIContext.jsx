import { createContext, useContext, useState } from 'react'

const UIContext = createContext({ isDrawing: false, setIsDrawing: () => {} })

export function UIProvider({ children }) {
  const [isDrawing, setIsDrawing] = useState(false)
  return (
    <UIContext.Provider value={{ isDrawing, setIsDrawing }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => useContext(UIContext)
