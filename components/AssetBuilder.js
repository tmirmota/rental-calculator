import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '../components'

export default class AssetBuilder extends Component {
  static defaultProps = {}

  render() {
    const { housePrice, rentalPrice } = this.props
    return (
      <View>
        <View style={styles.row}>
          <Typography variant="display3">House Price</Typography>
          <TextInput placeholder="$525,000" value={housePrice} />
        </View>
        <View style={styles.row}>
          <Typography variant="display3">Rent</Typography>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
