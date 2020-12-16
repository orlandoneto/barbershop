import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import UserContextProvider from './src/contexts/UserContext'
import MainStacks from './src/stacks/MainStacks'

export default () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStacks />
      </NavigationContainer>
    </UserContextProvider>
  )
}

