const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { favoriteID } = req.params

  db.favorites.destroy(favoriteID)
    .then(() => res.status(200).send('favorites/destroy: success'))
    .catch((err) => res.status(500).send('favorites/destroy: ' + err))
}
