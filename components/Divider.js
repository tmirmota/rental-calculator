import React from 'react'
import { View, StyleSheet } from 'react-native'

export default class extends React.PureComponent {
  render() {
    return <View style={styles.divider} />
  }
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#a9bbcb',
    margin: 0,
  },
})
