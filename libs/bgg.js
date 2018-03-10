import { parseString } from 'react-native-xml2js'

function getGameUrl (id) {
  return `https://www.boardgamegeek.com/boardgame/${id}`
}

function getGameName (game) {
  const name = game.name.constructor === Array ? game.name[0] : game.name
  return name._attributes.value
}

function setGameDefaults (game) {
  game.thumbnail = game.thumbnail || 'http://placehold.it/100x75'
  game.desc = game.desc || 'Loading description...'
  game.url = getGameUrl(game.id)
  return game
}

export function getHotGames (cb) {
  fetch('https://www.boardgamegeek.com/xmlapi2/hot?type=boardgame')
    .then(res => res.text())
    .then(txt => {
      parseString(txt, {trim: true}, (err, res) => {
        const items = res.items.item
        const results = items.map(i => setGameDefaults({
          id: i.$.id,
          name: i.name[0].$.value,
          thumbnail: i.thumbnail[0].$.value
        }))
        cb(results)
      })
    })
    .catch(err => console.error(err))
}

export function getGame (id, cb) {
  axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`)
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4})
      const item = data.items.item
      const game = setGameDefaults({
        id: id,
        name: getGameName(item),
        desc: item.description._text.split(' ').splice(0, 20).join(' ') + '...',
        thumbnail: item.thumbnail._text
      })
      console.log('cache store: game', id)
      return cb(game)
    })
    .catch((error) => {
      console.log(error)
      return cb(null)
    })
}

export function search (keywords, cb) {
  keywords = encodeURI(keywords)
  axios.get(`https://www.boardgamegeek.com/xmlapi2/search?query=${keywords}&type=boardgame&nosubtypes=boardgameexpansion`)
    .then((response) => {
      const data = convert.xml2js(response.data, {compact: true, spaces: 4}).items.item
      const items = data.constructor === Array ? data : [data]
      const results = items.slice(0, 10).map(i => (setGameDefaults({
        id: i._attributes.id,
        name: getGameName(i)
      })))
      return cb(results)
    })
    .catch((error) => {
      console.log(error)
      return cb(null)
    })
}
