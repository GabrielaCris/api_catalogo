const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/catalogo_jogos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const gameRoutes = require('./routes/gameRoutes');
app.use('/games', gameRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
