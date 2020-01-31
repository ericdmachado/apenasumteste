"use strict";

System.register(["./game/GameController"], function (exports_1, context_1) {
  "use strict";

  var GameController_1, game;

  var __moduleName = context_1 && context_1.id;

  return {
    setters: [function (GameController_1_1) {
      GameController_1 = GameController_1_1;
    }],
    execute: function () {
      game = new GameController_1.default();
      document.addEventListener("DOMContentLoaded", game.load);
    }
  };
});
//# sourceMappingURL=App.js.map
