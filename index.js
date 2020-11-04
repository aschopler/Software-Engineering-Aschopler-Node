const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('index'))

// app.get('/index', (req, res) => res.render('index'))
app.get('/my-favorite-hobby', (req, res) => res.render('my-favorite-hobby'))
app.get('/dice-roller', (req, res) => res.render('dice-roller'))
app.get('/syllabus', (req, res) => res.render('syllabus'))
app.get('/regexp', (req, res) => res.render('regexp'))

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))