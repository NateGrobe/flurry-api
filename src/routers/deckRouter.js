const deckRouter = require('express').Router();
const Deck = require('../models/deckModel');

deckRouter.get('/', async (req, res) => {
  const decks = await Deck.find({}).populate('cards', { title: 1, description: 1 });
  res.json(decks.map(deck => deck.toJSON()));
});

deckRouter.post('/', async (req, res) => {
  const body = req.body;

  const deck = new Deck({
    title: body.title
  });

  const savedDeck = await deck.save();
  res.json(savedDeck);
});

module.exports = deckRouter;
