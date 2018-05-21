import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import firebase from './config/firebase'

// Redux
import { Provider as ReduxProvider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { effectsMiddleware } from 'redux-effex'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { fetchUser } from './actions/UserActions'

// UI
import RootNavigation from './navigation/RootNavigation'
import { LoginScreen } from './screens'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default class AppContainer extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <App {...this.props} />
      </ReduxProvider>
    )
  }
}

@connect(state => state, {fetchUser})
class App extends Component {
  state = {
    isReady: false,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)
      if (user !== null) {
        this.props.fetchUser(user.uid)
        this.setState({ isReady: true })
      }
    })
  }

  render() {
    const { isReady } = this.state

    // TODO: Move isReady into Expo setup to pull data from cache
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
  },
})
