const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tasks: [
    {
      type: String,
      required: false,
    }
  ],
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
  },
  status: {
    type: String,
    // this should be true later but default to something
    required: false
  }
});

cardSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  }
});

module.exports = mongoose.model('Card', cardSchema);
