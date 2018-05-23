import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAsset, createAsset } from '../actions/AssetActions'
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  InputAccessoryView,
} from 'react-native'
import { AssetBuilder, Box, Divider, Typography } from '../components'
import optionConstants from '../constants/optionConstants'
import { Asset } from '../constants/Records'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getProfits } from '../selectors/financeSelectors'
import { typographyStyles } from '../components/Typography'
import accounting from 'accounting'

@connect(state => MainScreen.getUser(state), {
  updateAsset,
  createAsset,
})
export default class MainScreen extends Component {
  static getUser(state) {
    const { user } = state
    const profits = getProfits(state)
    return { user, profits }
  }

  static defaultProps = {
    profits: {},
  }

  state = {
    monthly: false,
  }

  toggleGain = () => {
    this.setState(prevState => ({ monthly: !prevState.monthly }))
  }

  render() {
    const { monthly } = this.state
    const { profits, updateAsset, user } = this.props
    const { assets = {}, selectedAsset } = user
    const asset = assets[selectedAsset] || {}

    const profit = profits[selectedAsset] || 'NA'

    const gain = monthly ? profit / 12 : profit
    const gainDisplay = monthly ? 'Monthly' : 'Annual'

    const didGain = profit > 0 ? 'Gain' : 'Loss'

    const inputAccessoryViewID = '1234'

    return (
      <View>
        <ScrollView keyboardDismissMode="on-drag">
          <KeyboardAwareScrollView>
            <View style={styles.container}>
              <View style={styles.title}>
                <TextInput
                  value={asset.displayName}
                  onChangeText={value => updateAsset('displayName', value)}
                  style={[typographyStyles.display2, styles.center]}
                  inputAccessoryViewID={inputAccessoryViewID}
                />
              </View>

              <TouchableOpacity onPress={this.toggleGain}>
                <View style={styles.header}>
                  <Typography variant="display5">
                    {accounting.formatMoney(gain, '$', 0)}
                  </Typography>
                  <Typography variant="display4">
                    {gainDisplay} {didGain}
                  </Typography>
                </View>
              </TouchableOpacity>

              {Object.entries(optionConstants).map(([key, value]) => (
                <Box
                  key={key}
                  name={key}
                  value={asset[key]}
                  onChange={updateAsset}
                  {...value}
                />
              ))}
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        {/* <InputAccessoryView nativeID={inputAccessoryViewID}>
          <Text>Hello World</Text>
        </InputAccessoryView> */}
      </View>
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
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  title: {
    borderColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 4,
    marginBottom: 8,
  },
  center: {
    textAlign: 'center',
  },
})
