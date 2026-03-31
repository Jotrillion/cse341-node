// ...existing code...
// ...existing code...
const bodyparser = require('body-parser')
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./auth');
const app = express();
const routes = require('./routes');

// Root route: show login status
// ...existing code...

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
//   next();
// })
//})

  app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))

  .use('/', require('./routes/index.js'));

// GitHub OAuth login route (must be after app and passport are initialized)
app.get('/login', passport.authenticate('github'));

// ...existing code...
// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    const name = req.user.displayName || req.user.username || (req.user._json && req.user._json.login) || 'Unknown';
    res.send(`Logged in as ${name}`);
  } else {
    res.send('Logged out');
  }
});
app.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Example protected route
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(req.user);
});

app.use('/api', routes);

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
