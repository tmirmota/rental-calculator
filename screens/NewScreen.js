import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { createAsset } from '../actions/AssetActions'

@connect(state => state, { createAsset })
export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Create new Asset"
          onPress={() =>
            this.props.navigation.navigate('Home', {
              id: null,
            })
          }
        />
        <Button title="Create New" onPress={() => this.props.createAsset()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
})
