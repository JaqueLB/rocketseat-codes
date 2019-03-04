const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

app.use(express.urlencoded({ extended: false }))

const ageMiddleware = (req, res, next) => {
  if (req.query.age === 'undefined' || req.query.age === '') {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.json({ message: req.message })
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  }
  return res.redirect(`/minor?age=${age}`)
})

app.get('/major', ageMiddleware, (req, res) => {
  return res.json({
    age: `Você é maior de idade e possui ${req.query.age} anos.`
  })
})

app.get('/minor', ageMiddleware, (req, res) => {
  return res.json({
    age: `Você é menor de idade e possui ${req.query.age} anos.`
  })
})

app.listen(3000)
