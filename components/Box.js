import React from 'react'
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native'
import Typography, { typographyStyles } from '../components/Typography'
import colors from '../constants/colorConstants'

export default class extends React.PureComponent {
  render() {
    const { placeholder, onChange, name, value, label } = this.props

    return (
      <TouchableOpacity
        onPress={() => this.textInput.focus()}
        style={styles.box}
      >
        <View style={styles.alignCenter}>
          <Typography variant="display3">{label}</Typography>
          <TextInput
            placeholder={placeholder}
            name={name}
            value={value}
            onChangeText={value => onChange(name, value)}
            keyboardType={'numeric'}
            clearTextOnFocus={true}
            style={[typographyStyles.display2, styles.input]}
            ref={input => (this.textInput = input)}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    minHeight: 128,
    minWidth: 128,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ui['02'],
    borderColor: colors.text['01'],
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    shadowColor: colors.ui['04'],
    shadowOffset: { height: 1 },
    shadowOpacity: 0.54,
    margin: 8,
    padding: 16,
  },
  alignCenter: {
    alignItems: 'center',
  },
  input: {
    textAlign: 'right',
    paddingBottom: 16,
  },
})
