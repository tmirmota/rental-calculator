import React, { Component } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import AssetsListItem from './AssetsListItem'
import Layout from '../constants/Layout'
import { withNavigation } from 'react-navigation'
import { selectAsset } from '../actions/AssetActions'

@withNavigation
@connect(state => AssetsList.getAssets(state), { selectAsset })
export default class AssetsList extends Component {
  static getAssets(state) {
    const { assets } = state.user
    return { assets }
  }

  render() {
    const { assets } = this.props
    const assetsList = Object.entries(assets).map(([key, value]) => ({
      key,
      ...value,
    }))

    return (
      <View>
        {assetsList.length > 0 ? (
          <FlatList
            data={assetsList}
            renderItem={({ item }) => (
              <AssetsListItem
                {...item}
                onPress={() => {
                  const { selectAsset, navigation } = this.props
                  selectAsset(item.key)
                  navigation.navigate('Home')
                }}
              />
            )}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={item => item.key}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 75,
            }}
          >
            <ActivityIndicator />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: Layout.HEADER_HEIGHT,
  },
})
