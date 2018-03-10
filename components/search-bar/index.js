import React from 'react'
import { View, TextInput } from 'react-native'

import styles from '../../styles'

const SearchBar = ({onChangeTextHandler}) =>
  <View style={styles.searchBar}>
    <TextInput
      style={styles.searchInput}
      onChangeText={onChangeTextHandler}
      placeholder='Search:' />
  </View>

export default SearchBar
