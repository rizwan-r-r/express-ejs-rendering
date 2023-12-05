const express = require('express');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/greet', (req, res) => {
  const name = req.query.name ? req.query.name : null;
  const message = name ? `Hello ${name}!` : `Hello!`;

  res.render('greet', {
    message
  });
});

app.get('/add-name', (req, res) => {
  res.render('add-name');
});

app.get('/partial-home', (req, res) => {
  res.render('partials/_home');
});

app.get('/partial-greet', (req, res) => {
  const name = req.query.name ? req.query.name : null;
  const message = name ? `Hello ${name}!` : `Hello!`;

  res.render('partials/_greet', {
    message
  });
});

app.get('/partial-add-name', (req, res) => {
  res.render('partials/_add-name');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
