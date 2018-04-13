import React from 'react'
import { Font } from 'expo'
import {
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from 'react-native'
import { pmt } from './utils/finance'

const colors = {
  text: {
    '01': '#152934',
    '02': '#5a6872',
  },
  ui: {
    '02': '#f5f7fa',
    '03': '#f0f3f6',
    '04': '#dfe3e6',
    '05': '#8c9ba5',
  },
}

class Row extends React.PureComponent {
  render() {
    return <View style={styles.row}>{this.props.children}</View>
  }
}

class Divider extends React.PureComponent {
  render() {
    return <View style={styles.divider}>{this.props.children}</View>
  }
}

class Box extends React.PureComponent {
  render() {
    const { placeholder, onChange, name, value, label } = this.props

    return (
      <TouchableOpacity
        onPress={() => this.textInput.focus()}
        style={styles.box}
      >
        <View style={styles.alignCenter}>
          <Text style={styles.h3}>{label}</Text>
          <TextInput
            placeholder={placeholder}
            name={name}
            value={value}
            onChangeText={value => onChange(name, value)}
            keyboardType={'numeric'}
            clearTextOnFocus={true}
            style={[styles.h4, styles.input]}
            ref={input => (this.textInput = input)}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

export default class App extends React.Component {
  state = {
    price: '',
    rent: '',
    utilities: '',
    maintenance: '',
    tax: '',
    down: '',
    rate: '',
    fontsLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      Montserrat: require('./assets/Montserrat/Montserrat-Regular.ttf'),
    })
    this.setState({ fontsLoaded: true })
  }

  handleChange = (name, text) => {
    this.setState({ [name]: text })
  }

  render() {
    const {
      price,
      rent,
      utilities,
      maintenance,
      rate,
      down,
      fontsLoaded,
    } = this.state

    const per = 12
    const nper = 25 * per

    const loan = price * (1 - down)
    const payments = pmt(rate, per, nper, -loan)
    const profit = Math.floor((rent - payments - maintenance - utilities) * 12)

    if (!fontsLoaded) {
      return <View>Loading fonts</View>
    }

    return (
      <ScrollView keyboardDismissMode="on-drag">
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.h1}>${profit}</Text>
              <Text style={styles.h2}>Annual Gain</Text>
            </View>

            <Row>
              <Box
                label="House Price"
                name="price"
                value={price}
                placeholder="$525,000"
                onChange={this.handleChange}
              />
              <Box
                label="Rent Price"
                name="rent"
                value={rent}
                placeholder="$2,650"
                onChange={this.handleChange}
              />
            </Row>

            <Row>
              <Box
                label="Utilities"
                name="utilities"
                value={utilities}
                placeholder="$200"
                onChange={this.handleChange}
              />
              <Box
                label="Maint. Fees"
                name="maintenance"
                value={maintenance}
                placeholder="$79"
                onChange={this.handleChange}
              />
            </Row>

            <Row>
              <Box
                label="Mortgage Rate"
                name="rate"
                value={rate}
                placeholder="2.49%"
                onChange={this.handleChange}
              />
              <Box
                label="Down Payment"
                name="down"
                value={down}
                placeholder="20%"
                onChange={this.handleChange}
              />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingRight: 16,
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  input: {
    textAlign: 'right',
  },
  alignCenter: {
    alignItems: 'center',
  },
  box: {
    flex: 1,
    minHeight: 128,
    width: 128,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ui['02'],
    borderColor: colors.text['01'],
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    height: 30,
    shadowColor: colors.ui['04'],
    shadowOffset: { height: 1 },
    shadowOpacity: 0.54,
    margin: 8,
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#a9bbcb',
    margin: 0,
  },
  h1: {
    fontFamily: 'Bodoni 72',
    fontSize: 72,
    color: colors.text['01'],
  },
  h2: {
    fontFamily: 'Bodoni 72',
    fontSize: 40,
    color: colors.text['02'],
  },
  h3: {
    fontFamily: 'Futura',
    fontSize: 24,
    color: colors.text['01'],
    textAlign: 'center',
    marginBottom: 8,
  },
  h4: {
    fontFamily: 'Futura',
    fontSize: 20,
    color: colors.text['01'],
  },
})
