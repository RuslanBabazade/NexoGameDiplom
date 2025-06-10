import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

const Game = mongoose.model("Game", gameSchema);
export default Game;