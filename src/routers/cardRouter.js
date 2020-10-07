const cardRouter = require('express').Router();
const Card = require('../models/cardModel');
const Deck = require('../models/deckModel');

cardRouter.get('/', async (req, res) => {
  const cards = await Card.find({}).populate('deck', { title: 1 });
  res.json(cards.map(card => card.toJSON()));
});

cardRouter.post('/', async (req, res) => {
  const body = req.body;

  const deck = await Deck.findById(body.deck);

  const card = new Card({
    title: body.title,
    description: body.description,
    tasks: body.tasks,
    deck: deck._id,
  });


  const savedCard = await card.save();
  deck.cards = deck.cards.concat(savedCard._id);
  await deck.save();
  res.json(savedCard);
});

cardRouter.delete('/:id', async (req, res) => {
  const card = await Card.findById(req.params.id);
  const deck = await Deck.findById(card.deck);

  await card.remove();

  deck.cards = deck.cards.filter(d => d.toString() !== req.params.id.toString());
  await deck.save();

  res.status(204).end();
});

module.exports = cardRouter;
