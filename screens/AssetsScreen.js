import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Typography } from '../components'

@connect(state => AssetsScreen.getAssets(state))
export default class AssetsScreen extends Component {
  static getAssets({ user }) {
    const { assets } = user
    return { assets }
  }
  render() {
    const { assets } = this.props
    return (
      <View style={styles.container}>
        {Object.entries(assets).map(([key, value]) => (
          <Typography key={key} variant="display4">
            {value.displayName}
          </Typography>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
})
