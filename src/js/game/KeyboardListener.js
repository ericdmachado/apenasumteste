"use strict";

System.register([], function (exports_1, context_1) {
  "use strict";

  var KeyboardListener;

  var __moduleName = context_1 && context_1.id;

  return {
    setters: [],
    execute: function () {
      KeyboardListener = class KeyboardListener {
        constructor() {
          this.keycodes = {
            32: 'Space',
            87: 'Up',
            83: 'Down'
          };
          this.state = {
            observers: []
          };
          document.addEventListener('keydown', this.handleKeydown);
        }

        subscribe(observerFunction) {
          this.state.observers(observerFunction);
        }

        handleKeydown(event) {
          const keyPressed = event.key;
          const command = {
            playerId: 'player1',
            keyPressed
          };
          this.notifyAll(command);
        }

        notifyAll(command) {
          console.log(`Notifying ${this.state.observers.length} observers`);

          for (const observerFunction of this.state.observers) {
            observerFunction(command);
          }
        }

      };
      exports_1("default", KeyboardListener);
    }
  };
});
//# sourceMappingURL=KeyboardListener.js.map
