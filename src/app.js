const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');

// routers
const cardRouter = require('./routers/cardRouter');
const deckRouter = require('./routers/deckRouter');

const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

// connect to mongodb
logger.info('connecting to', config.MONGO_URI);

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.get('/', async (req, res) => {
  res.json('hello there');
});

// middleware
app.use(cors());
app.use(express.json());
app.use(middleware.reqLogger);

app.use('/api/cards', cardRouter);
app.use('/api/decks', deckRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
