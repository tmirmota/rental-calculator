import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Typography } from '../components'
import Layout from '../constants/Layout'

export default class AssetsListItem extends Component {
  render() {
    const { displayName, onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View>
          <Typography>{displayName}</Typography>
        </View>
        <View>
          <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
    width: Layout.window.width,
  },
})
