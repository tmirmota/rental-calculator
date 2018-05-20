import React from 'react'
import * as firebase from 'firebase'
import firebaseConfig from './config/firebaseConfig'
import { View, Text } from 'react-native'
import { Login, Main } from './screens'
import optionConstants from './constants/optionConstants'
import { pmt } from './utils/finance'

firebase.initializeApp(firebaseConfig)

export default class extends React.PureComponent {
  state = {
    tax: '',
    loggedIn: true,
    isLoading: false,
    options: {
      ...Object.keys(optionConstants).map(key => ({ [key]: '' })),
    },
  }

  handleChange = (name, text) => {
    this.setState({ [name]: text })
  }

  render() {
    const { isLoading, loggedIn, options } = this.state

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
    } else if (!loggedIn) {
      screen = <Login />
    } else {
      screen = <Main handleChangeOption={this.handleChange} options={options} />
    }

    return screen
  }
}
