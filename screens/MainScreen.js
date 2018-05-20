import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native'
import { Row, Box, Divider, Typography } from '../components'
import optionConstants from '../constants/optionConstants'

export default class extends Component {
  static defaultProps = {
    profit: 'NA',
    options: {},
  }
  render() {
    const { options, profit, onChange } = this.props
    return (
      <ScrollView keyboardDismissMode="on-drag">
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <View style={styles.header}>
              <Typography variant="display5">${profit}</Typography>
              <Typography variant="display4">Annual Gain</Typography>
            </View>

            <Row>
              {Object.entries(optionConstants).map(([key, value]) => (
                <Box
                  key={key}
                  name={key}
                  value={options[key]}
                  onChange={onChange}
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
