import React from 'react'
import { MainScreen, AssetsScreen } from '../screens'
import { createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

export default createBottomTabNavigator(
  {
    Home: { screen: MainScreen },
    Properties: { screen: AssetsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`
        } else if (routeName === 'Properties') {
          iconName = `ios-list${focused ? '' : '-outline'}`
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  },
)
