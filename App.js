import React from 'react'
import { View, Text } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Login, Main, Assets } from './screens'
import optionConstants from './constants/optionConstants'
import { pmt } from './utils/finance'

import * as firebase from 'firebase'
import firebaseConfig from './config/firebaseConfig'

firebase.initializeApp(firebaseConfig)

const db = firebase.database()

class Home extends React.PureComponent {
  state = {
    tax: '',
    loggedIn: false,
    isLoading: false,
    user: null,
    assets: {},
    options: {
      ...Object.keys(optionConstants).map(key => ({ [key]: '' })),
    },
  }

  createAsset = name => {
    const assetRef = db.ref(`users/${uid}/assets`)
    const newAssetRef = assetRef.push()
  }

  handleChangeOption = (key, value) => {
    const { user, selectedAsset } = this.state
    const { uid } = user
    const assetRef = db.ref(`users/${uid}/assets/${selectedAsset}`)

    assetRef.update({
      [key]: value,
    })
  }

  render() {
    const { isLoading, loggedIn, assets, selectedAsset, options } = this.state

    const per = 12
    const nper = 25 * per

    // const loan = price * (1 - down)
    // const payments = pmt(rate, per, nper, -loan)
    // const profit = Math.floor((rent - payments - maintenance - utilities) * 12)

    let screen

    if (isLoading) {
      screen = (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else if (!this.state.user) {
      firebase.auth().onAuthStateChanged(user => {
        if (user !== null && !this.state.user) {
          console.log('user', user)
          const { uid } = user

          const selectedRef = db.ref(`users/${uid}/selectedAsset`)
          selectedRef.on('value', snapshot =>
            this.setState({ selectedAsset: snapshot.val() }),
          )

          const assetsRef = db.ref(`users/${uid}/assets`)
          assetsRef.on('value', snapshot =>
            this.setState({ assets: snapshot.val() }),
          )

          this.setState({ user })
        }
      })
      screen = <Login firebase={firebase} />
    } else {
      screen = (
        <Main
          onChange={this.handleChangeOption}
          options={assets[selectedAsset]}
        />
      )
    }

    return screen
  }
}

export default TabNavigator(
  {
    Home: { screen: Home },
    Properties: { screen: Assets },
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
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  },
)
