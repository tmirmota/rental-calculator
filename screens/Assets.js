import React from 'react'
import { View, Text, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello Assets</Text>
        <Button
          title="Go to Homescreen"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </View>
    )
  }
}
