require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.urlencoded());

const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Listening at PORT:${port}`);
});

app.get('/', (req, res) => res.redirect('/template'));

app.get('/template', (req, res) => res.render('home.ejs'));

app.post('/template', (req, res) => {
  res.header('Content-Type', 'text/plain');

  const {
    company, signature, title, style,
  } = req.body;
  if (style === 'simple') {
    return res.render('simpleTemplate.ejs', { signature, company, title });
  }
  return res.render('template.ejs', { signature, company, title });
});

app.get('*', (req, res) => res.send('<h1> 404: You seem to be lost <h1>'));
