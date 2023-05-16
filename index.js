const express = require('express');
const app = express();

//  middleware
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isWorkingHours = day >= 1 && day <= 5 && hour >= 9 && hour < 17;

  if (isWorkingHours) {
    next();
  } else {
      res.render('close');
  }
};

// engine  EJS
app.set('view engine', 'ejs');

// CSS
app.use(express.static('public'));

// Routes
app.get('/', checkWorkingHours, (req, res) => {
  res.render('home');
});

app.get('/services', checkWorkingHours, (req, res) => {
  res.render('services');
});

app.get('/contact', checkWorkingHours, (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
