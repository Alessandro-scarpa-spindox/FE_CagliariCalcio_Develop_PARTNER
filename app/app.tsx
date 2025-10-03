import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LogBox } from 'react-native'

import { AuthenticatedStack } from '@/Stacks/authenticatedStack'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.',
])

const Stack = createNativeStackNavigator()

export const App = () => {
  return <AuthenticatedStack />
}
