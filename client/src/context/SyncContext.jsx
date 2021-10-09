import React, { useState, createContext } from 'react'

export const SyncContext = createContext({})

export const SyncProvider = props => {
  const [rootId, setRootId] = useState(undefined)
  const [mobileId, setMobileId] = useState(undefined)

  return (
    <SyncContext.Provider value={{ rootId, setRootId, mobileId, setMobileId }}>
      {props.children}
    </SyncContext.Provider>
  )
}