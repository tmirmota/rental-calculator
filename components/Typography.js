import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import colors from '../constants/colorConstants'
import { Text, StyleSheet } from 'react-native'

export default class extends React.PureComponent {
  static propTypes = {
    variant: PropTypes.oneOf([
      'default',
      'display5',
      'display4',
      'display3',
      'display2',
      'display1',
    ]),
  }
  static defaultProps = {
    style: {},
    fontWeight: '300',
  }
  render() {
    const { style: styleProps, fontWeight, variant, ...other } = this.props

    return (
      <Text
        style={[
          typographyStyles[variant],
          fontWeightStyles[fontWeight],
          ...styleProps,
        ]}
        {...other}
      />
    )
  }
}

let fw = {}
const fontWeights = ['100', '300', '500', '700', 'bold']
for (let fontWeight of fontWeights) {
  fw[fontWeight] = { fontWeight }
}

export const fontWeightStyles = StyleSheet.create(fw)

export const typographyStyles = StyleSheet.create({
  display5: {
    fontFamily: 'Bodoni 72',
    fontSize: 72,
    color: colors.text['01'],
  },
  display4: {
    fontFamily: 'Bodoni 72',
    fontSize: 40,
    color: colors.text['02'],
  },
  display3: {
    fontFamily: 'Futura',
    fontSize: 24,
    color: colors.text['01'],
    textAlign: 'center',
  },
  display2: {
    fontFamily: 'Futura',
    fontSize: 20,
    color: colors.text['01'],
  },
  display1: {
    fontFamily: 'Futura',
    fontSize: 20,
  },
  heading: {},
  subheading: {},
  title: {},
})
