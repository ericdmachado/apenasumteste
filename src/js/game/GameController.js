"use strict";

System.register(["./Spaceship", "./Score", "./Starfield", "./KeyboardListener"], function (exports_1, context_1) {
  "use strict";

  var Spaceship_1, Score_1, Starfield_1, KeyboardListener_1, GameController;

  var __moduleName = context_1 && context_1.id;

  return {
    setters: [function (Spaceship_1_1) {
      Spaceship_1 = Spaceship_1_1;
    }, function (Score_1_1) {
      Score_1 = Score_1_1;
    }, function (Starfield_1_1) {
      Starfield_1 = Starfield_1_1;
    }, function (KeyboardListener_1_1) {
      KeyboardListener_1 = KeyboardListener_1_1;
    }],
    execute: function () {
      GameController = class GameController {
        constructor() {
          let spaceship = new Spaceship_1.default();
          let score = new Score_1.default();
          let starfield = new Starfield_1.default();
          let keyboardListener = new KeyboardListener_1.default();
          keyboardListener.subscribe(spaceship.move);
        }

        load() {
          console.info('LOAD');
        }

      };
      exports_1("default", GameController);
    }
  };
});
//# sourceMappingURL=GameController.js.map
