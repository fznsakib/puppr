const db = require(`${process.env.PWD}/database/db`)
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  projectID: 'puppr-8727d',
  keyFilename: `${process.env.PWD}/functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json`
})
const bucket = storage.bucket('puppr-8727d.appspot.com')

module.exports = (req, res) => {
  const { imageName, caption, username } = req.body

  bucket.file(imageName).getSignedUrl({ action: 'read', expires: '12-12-2500' })
    .then(([imageURL]) => {
      db.posts.create([caption, imageURL, username])
        .then(() => res.status(200).send('posts/create: success'))
        .catch((err) => res.status(500).send('posts/create: ' + err))
    })
    .catch((err) => res.status(500).send('/posts/create: [getSignedUrl] ' + err))
}
