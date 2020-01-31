"use strict";

System.register([], function (exports_1, context_1) {
  "use strict";

  var Score;

  var __moduleName = context_1 && context_1.id;

  return {
    setters: [],
    execute: function () {
      Score = class Score {
        constructor() {
          this._score = 0;
          this._points = 0;
          this.time = 0;
          this.fntime = 0;
          this.lim = [];
          this.n = 1;
        }

        setPoints() {}

        points() {}

        get score() {
          return 0;
        }

      };
      exports_1("default", Score);
    }
  };
});
//# sourceMappingURL=Score.js.map
