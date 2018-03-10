import React, { Component } from 'react'
import { FlatList, TextInput, View } from 'react-native'

import styles from './styles'
import { getHotGames } from './libs/bgg'

import SearchBar from './components/search-bar'
import GameCard from './components/game-card'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {games: []}
    this._handleOnChangeText = this._handleOnChangeText.bind(this)
  }

  componentDidMount () {
    getHotGames(games => {
      this.setState({games: games})
    })
  }

  _handleOnChangeText (e) {
    console.log('TODO search:', e)
  }

  _renderGame ({item}) {
    return <GameCard key={item.id} {...item} />
  }

  render () {
    const games = this.state.games
    return (
      <View style={styles.appContainer}>
        <SearchBar onChangeTextHandler={this._handleOnChangeText} />
        <FlatList style={styles.resultsContainer} data={games} renderItem={this._renderGame} />
      </View>
    )
  }
}
