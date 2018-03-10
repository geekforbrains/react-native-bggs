import React, { Component } from 'react'
import { Dimensions, Linking } from 'react-native'

import styles from '../../styles'
import GameCardView from './view'

class GameCard extends Component {
  _handleOnpress (url) {
    Linking.openURL(url).catch(console.error)
  }

  render () {
    const game = this.props
    const source = {uri: game.thumbnail}
    const width = Dimensions.get('window').width
    return (
      <GameCardView
        source={source}
        width={width}
        onPressHandler={this._handleOnpress}
        {...game} />
    )
  }
}

export default GameCard
