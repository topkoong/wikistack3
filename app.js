const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const models = require('./models')
// const router = express.Router()
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')



app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, './stylesheets')))
app.use('/wiki', wikiRouter)
app.use('/user', userRouter)
app.use(morgan('dev'))

// db.authenticate().
// then(() => {
//   console.log('connected to database!')
// })

const PORT = 3000

const init = async () => {
  await models.User.sync()
  await models.Page.sync()
  app.listen(PORT, ()=> {
    console.log(`USING ${PORT}`)
  })
}

init()
app.get('/', (req, res) => {
    res.redirect('/wiki');
})


module.exports = app
// module.exports = router
