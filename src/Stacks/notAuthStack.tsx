import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Onboarding } from '../../app/flows/Onboarding'
import { ConfirmRegistration } from '../../app/flows/ConfirmRegistration'
import { PasswordRecovery } from '../../app/flows/PasswordRecovery'
import { ShowEventPass } from '../../app/flows/ShowEventPass'
import { Registration } from '../../app/flows/Registration'
import { withBackgroundImage } from '@/hocs/withLayout'
import { Colors } from '@/constants/Colors'

const Stack = createNativeStackNavigator()

export const NotAuthStack = withBackgroundImage(() => {
  return (
    <NavigationContainer
      independent
      linking={{
        prefixes: ['partners://'],
        config: {
          initialRouteName: 'OnBoarding',
          screens: {
            OnBoarding: 'onboarding',
            ConfirmRegistration: 'confirm',
            Recovery: 'recovery',
            EventPass: 'ticket/:guestId/:guestName?',
            Registration: 'registration',
          },
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: Colors.backgroundPrimary,
          },
        }}
      >
        <Stack.Screen
          name="OnBoarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConfirmRegistration"
          component={ConfirmRegistration}
          options={{
            headerShown: false,
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
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
})
