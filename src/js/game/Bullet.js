"use strict";

System.register([], function (exports_1, context_1) {
  "use strict";

  var Bullet;

  var __moduleName = context_1 && context_1.id;

  return {
    setters: [],
    execute: function () {
      Bullet = class Bullet {
        constructor(m, x, y) {
          this.width = 10;
          this.height = 2;
          this.active = true;
          this.x = x;
          this.y = y;
          this.main = m;
        }

        draw() {}

        inBounds() {}

        update() {}

      };
      exports_1("default", Bullet);
    }
  };
});
//# sourceMappingURL=Bullet.js.map
