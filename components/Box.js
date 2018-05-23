import React from 'react'
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native'
import Typography, {
  typographyStyles,
  fontWeightStyles,
} from '../components/Typography'
import colors from '../constants/colorConstants'
import accounting from 'accounting'

export default class extends React.PureComponent {
  static defaultProps = {
    variant: 'display3',
    numOptions: {
      symbol: '$',
      format: '%s%v',
      precision: 0,
    },
  }

  render() {
    const {
      placeholder,
      onChange,
      name,
      value,
      label,
      variant,
      numOptions,
    } = this.props

    const formattedNum = accounting.formatMoney(value, numOptions)

    return (
      <TouchableOpacity
        onPress={() => this.textInput.focus()}
        style={styles.container}
        activeOpacity={0.8}
      >
        <Typography variant={variant}>{label}</Typography>
        <View>
          <TextInput
            placeholder={formattedNum || placeholder}
            name={name}
            value={formattedNum}
            onChangeText={value => onChange(name, accounting.unformat(value))}
            keyboardType={'numeric'}
            clearTextOnFocus={true}
            style={[typographyStyles[variant], styles.input]}
            ref={input => (this.textInput = input)}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ui['02'],
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
    shadowColor: colors.ui['03'],
    shadowOffset: { height: 1 },
    shadowOpacity: 0.54,
    padding: 8,
    marginBottom: 8,
  },
  input: {
    textAlign: 'right',
    minWidth: 120,
  },
})
