const express = require('express')

const app = express()
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' })
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  }
  return res.redirect(`/minor?age=${req.body.age}`)
})

app.get('/major', (req, res) => {
  return res.json({
    age: `Você é maior de idade e possui ${req.query.age} anos.`
  })
})

app.get('/minor', (req, res) => {
  return res.json({
    age: `Você é menor de idade e possui ${req.query.age} anos.`
  })
})

app.listen(3000)
