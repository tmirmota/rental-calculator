import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import AssetsList from '../components/AssetsList'

@connect(state => AssetsScreen.getAssets(state))
export default class AssetsScreen extends Component {
  static getAssets({ user }) {
    const { assets } = user
    return { assets }
  }
  render() {
    return (
      <View style={styles.container}>
        <AssetsList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
})
