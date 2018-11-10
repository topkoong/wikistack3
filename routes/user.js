const express = require('express')
// const app = express()
const router = express.Router()

router.get('/', (req, res) => {
  console.log('Want to retrieve all WikiPages')
  res.status(200).send('got to get /wiki/')

})

module.exports = router
