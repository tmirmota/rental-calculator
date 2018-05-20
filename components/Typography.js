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
  }
  render() {
    const { style: styleProps, variant, ...other } = this.props

    return (
      <Text style={[typographyStyles[variant], ...styleProps]} {...other} />
    )
  }
}

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
    marginBottom: 8,
  },
  display2: {
    fontFamily: 'Futura',
    fontSize: 20,
    color: colors.text['01'],
  },
})
