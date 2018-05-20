import Expo from 'expo'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import firebase from '../config/firebase'
import { Typography } from '../components'

export default class LoginScreen extends React.Component {
  facebookLogin = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '1724470454305044',
      { permissions: ['public_profile'] },
    )
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInAndRetrieveDataWithCredential(credential)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Typography variant="display3">Login or Signup</Typography>
        <Button onPress={this.facebookLogin} title="Facebook" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
