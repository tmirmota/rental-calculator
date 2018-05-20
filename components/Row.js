import React from 'react'
import { View, StyleSheet } from 'react-native'

export default class extends React.PureComponent {
  render() {
    return <View style={styles.row}>{this.props.children}</View>
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
