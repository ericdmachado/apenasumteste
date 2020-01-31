import GameController from "./game/GameController";

const game = new GameController();
document.addEventListener("DOMContentLoaded", game.load);