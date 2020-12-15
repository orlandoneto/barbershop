import React, { createContext, useReducer } from 'react'
import { initialState, UserContext } from '../contexts/UserContext'

export const UserContext = createContext()

export default ({ children }) => {
    return (
        <UserContext.Provider>
            {children}
        </UserContext.Provider>
    )
}