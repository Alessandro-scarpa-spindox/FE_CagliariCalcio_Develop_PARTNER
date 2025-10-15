import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { HomePage } from '../../app/flows/HomePage'
import { MatchDetail } from '../../app/flows/MatchDetail'
import { Wallet } from '../../app/flows/Wallet'
import { Account } from '../../app/flows/Account'
import { PasswordRecovery } from '../../app/flows/PasswordRecovery'
import { ShowEventPass } from '../../app/flows/ShowEventPass'
import { Colors } from '@/constants/Colors'
import { Logo } from '@/components/Logo'
import { Avatar } from '@/components/Avatar'
import { withBackgroundImage } from '@/hocs/withLayout'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.',
])

const Stack = createNativeStackNavigator()
const Screen = Stack.Screen

export const AuthenticatedStack = withBackgroundImage(() => {
  return (
    <NavigationContainer
      independent
      linking={{
        prefixes: ['partners://'],
        config: {
          initialRouteName: 'HomePage',
          screens: {
            HomePage: 'HomePage',
            Recovery: 'recovery',
            EventPass: 'ticket/:guestId/:guestName?',
          },
        },
      }}
      documentTitle={{
        formatter: (options, route) =>
          `${options ? (options.title ?? `${route?.name} -`) : ''} Cagliari Calcio Partners`,
      }}
    >
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: Colors.backgroundPrimary,
          },
        }}
      >
        <Screen name="HomePage" component={HomePage} options={HOME_OPTIONS as any} />
        <Screen name="MatchDetail" component={MatchDetail} options={MATCH_OPTIONS} />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{
            headerShown: false,
            /*  headerStyle: {
              backgroundColor: 'none',
            },
            headerTintColor: 'none',
            headerTitle: '',
            headerBackTitleVisible: false,
            headerRight: ShareMenu, */
          }}
        />

        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerStyle: {
              backgroundColor: '#0B264B',
            },
            headerTintColor: Colors.textLight,
            headerShadowVisible: false,
            headerTitle: '',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Recovery"
          component={PasswordRecovery}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EventPass"
          component={ShowEventPass}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
})

const HOME_OPTIONS = {
  unmountOnBlur: true,
  freezeOnBlur: true,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#0B264B',
  },

  headerTitleAlign: 'center',
  headerTintColor: Colors.textLight,
  headerLeft: () => <Logo style={{ marginLeft: 20 }} />,
  headerRight: () => <Avatar style={{ marginRight: 20 }} />,
}

const MATCH_OPTIONS = {
  headerShown: false,
}
