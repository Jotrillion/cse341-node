const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());
var options = {
  swaggerOptions: {
    validatorUrl: null
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});