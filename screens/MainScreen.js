import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAsset, createAsset } from '../actions/AssetActions'
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native'
import { Row, Box, Divider, Typography } from '../components'
import optionConstants from '../constants/optionConstants'
import { Asset } from '../constants/Records'

@connect(state => MainScreen.getUser(state), {
  updateAsset,
  createAsset,
})
export default class MainScreen extends Component {
  static getUser({ user }) {
    return { user }
  }

  static defaultProps = {
    profit: 'NA',
    options: {},
  }

  render() {
    const { options, profit, updateAsset, user } = this.props
    const asset = user.assets[user.selectedAsset] || {}

    const { navigation } = this.props
    const id = navigation.getParam('id', 'NO-ID')

    if (id === null) {
      this.props.createAsset()
    }

    return (
      <ScrollView keyboardDismissMode="on-drag">
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <View style={styles.header}>
              <Typography variant="display5">${profit}</Typography>
              <Typography variant="display4">Annual Gain</Typography>
              <Typography variant="display2">{asset.displayName}</Typography>
            </View>

            <Row>
              {Object.entries(optionConstants).map(([key, value]) => (
                <Box
                  key={key}
                  name={key}
                  value={asset[key]}
                  onChange={updateAsset}
                  {...value}
                />
              ))}
            </Row>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  header: {
    paddingRight: 16,
    marginBottom: 16,
    alignItems: 'flex-end',
  },
})
