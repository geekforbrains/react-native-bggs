import React from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'

import styles from '../../styles'

const GameCardView = ({name, source, url, width, onPressHandler}) =>
  <View style={styles.gameContainer}>
    <Text style={styles.gameTitle}>{name}</Text>
    <TouchableHighlight onPress={e => onPressHandler(url)}>
      <AutoHeightImage width={width} source={source} />
    </TouchableHighlight>
  </View>

export default GameCardView
