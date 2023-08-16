import { createContext, useState } from "react";

export const ItemContext = createContext({
  itemId: null,
  setItemId: () => {},
  itemName: null,
  setItemName: () => {}
})

export const ItemProvider = ({children}) => {

  const [itemId, setItemId ] = useState(null)
  const [itemName, setItemName ] = useState(null)

  return <ItemContext.Provider value={{ itemId, setItemId, itemName, setItemName }} >{children}</ItemContext.Provider>
}