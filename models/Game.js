const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
});

gameSchema.statics.createGame = function (title, genre, releaseYear) {
  const game = new this({ title, genre, releaseYear });
  return game.save();
};

gameSchema.statics.findAllGames = function () {
  return this.find();
};

gameSchema.statics.findGameById = function (gameId) {
  return this.findById(gameId);
};

gameSchema.statics.updateGameById = function (gameId, update) {
  return this.findByIdAndUpdate(gameId, update, { new: true });
};

gameSchema.statics.deleteGameById = function (gameId) {
  return this.findByIdAndRemove(gameId);
};

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
