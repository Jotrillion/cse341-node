
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
// Root route
app.get('/', (req, res) => {
  res.send('helloworld');
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
