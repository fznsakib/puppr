const db = require(`${process.env.PWD}/database/db`)
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  projectID: 'puppr-8727d',
  keyFilename: 'functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json'
})
const bucket = storage.bucket('puppr-8727d.appspot.com')

module.exports = (req, res) => {
  const { postID } = req.params
  const { newImageName } = req.body

  bucket.file(newImageName).getSignedUrl({ action: 'read', expires: '12-12-2500' })
    .then((newImageURL) => {
      db.posts.update(postID, 'imageURL', newImageURL)
        .then(() => res.status(200).send('post/updateImage: success'))
        .catch((err) => res.status(500).send('post/updateImage: ' + err))
    })
}
