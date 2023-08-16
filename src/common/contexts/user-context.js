import { createContext, useState } from "react";

export const UserContext = createContext({
  accountId: null,
  setAccountId: () => {},
  accountName: null,
  setAccountName: () => {},
  accountEmail: null,
  setAccountEmail: () => {},
  userRenterId: null,
  setUserRenterId: () => {},
  userRenteeId: null,
  setUserRenteeId: () => {}
})

export const UserProvider = ({children}) => {

  const [ accountId, setAccountId ] = useState(null)
  const [ accountName, setAccountName ] = useState(null)
  const [ accountEmail, setAccountEmail ] = useState(null)
  const [ userRenterId, setUserRenterId ] = useState(null)
  const [ userRenteeId, setUserRenteeId ] = useState(null)

  return <UserContext.Provider value={{ accountId, setAccountId, accountName, setAccountName, accountEmail, setAccountEmail, userRenterId, setUserRenterId, userRenteeId, setUserRenteeId }} >{children}</UserContext.Provider>
}