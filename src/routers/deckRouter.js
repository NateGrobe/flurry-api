const deckRouter = require('express').Router();
const Deck = require('../models/deckModel');
const Card = require('../models/cardModel');

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

deckRouter.delete('/:id', async (req, res) => {
  const deck = await Deck.findById(req.params.id);
  for (let i = 0; i < deck.cards.length; i++) {
    await Card.findByIdAndDelete(deck.cards[i]);
  }
  await deck.remove();
  res.status(204).end();
});

module.exports = deckRouter;
