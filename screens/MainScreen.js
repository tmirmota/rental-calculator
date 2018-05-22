import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAsset, createAsset } from '../actions/AssetActions'
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native'
import { Row, Box, Divider, Typography } from '../components'
import optionConstants from '../constants/optionConstants'
import { Asset } from '../constants/Records'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  }

  render() {
    const { profit, updateAsset, user } = this.props
    const { assets = {}, selectedAsset } = user
    const asset = assets[selectedAsset] || {}

    return (
      <ScrollView keyboardDismissMode="on-drag">
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Typography variant="display5">${profit}</Typography>
              <Typography variant="display4">Annual Gain</Typography>
              <TextInput
                value={asset.displayName}
                onChangeText={value => updateAsset('displayName', value)}
              />
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
        </KeyboardAwareScrollView>
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
