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
  const { age } = req.query
  if (isNaN(age) || !age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('check')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  }
  return res.redirect(`/minor?age=${age}`)
})

app.get('/major', ageMiddleware, (req, res) => {
  return res.render('major', {
    age: req.query.age
  })
})

app.get('/minor', ageMiddleware, (req, res) => {
  return res.render('minor', {
    age: req.query.age
  })
})

app.listen(3000)
