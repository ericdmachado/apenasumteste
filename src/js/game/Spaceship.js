"use strict";

System.register([], function (exports_1, context_1) {
  "use strict";

  var SpaceShip;

  var __moduleName = context_1 && context_1.id;

  return {
    setters: [],
    execute: function () {
      SpaceShip = class SpaceShip {
        constructor() {
          this.angle = 0;
          this.counter = 0;
          this.shiphalf = 0;
          this.canvas = document.createElement('canvas');
          this.context = this.canvas.getContext('2d');
          this.state = {
            players: []
          };
        }

        loadSpaceship() {}

        move(command) {
          console.info(`Moving ${command.playerId} with command ${command.keyPressed}`);
          const acceptedMoves = {
            ArrowUp(player) {
              console.info('Moving player Up');
            },

            ArrowDown(player) {
              console.info('Moving player ArrowDown');
            },

            ArrowLeft(player) {
              console.info('Moving player Left');
            },

            ArrowRight(player) {
              console.info('Moving player Right');
            }

          };
          const keyPressed = command.keyPressed;
          const player = this.state.players[command.playerId];
          console.info(keyPressed, player, acceptedMoves);
        }

        draw() {}

        update() {}

        fire() {}

        setPixelRatio() {}

      };
      exports_1("default", SpaceShip);
    }
  };
});
//# sourceMappingURL=Spaceship.js.map
