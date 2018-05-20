import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import firebase from './config/firebase'

// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { effectsMiddleware } from 'redux-effex'
import rootReducer from './reducers'

// UI
import RootNavigation from './navigation/RootNavigation'
import { LoginScreen } from './screens'

const store = createStore(rootReducer, applyMiddleware())

export default class AppContainer extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <App {...this.props} />
      </ReduxProvider>
    )
  }
}

class App extends Component {
  state = {
    isReady: false,
  }

  render() {
    const { isReady } = this.state

    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)
      if (user !== null) {
        this.setState({ isReady: true })
      }
    })

    return (
      <View style={styles.container}>
        {isReady ? <RootNavigation /> : <LoginScreen />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
