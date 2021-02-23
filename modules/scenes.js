/* eslint-disable no-undef, no-unused-vars */

var Scenes = {};

module.exports = Scenes;

var Gui = require("./UIElements.js");
var Buttons = require("./UIElements.js");

(function () {
  Scenes.currentLoop = "None";
  Scenes.Clear = function () {
    try {
      buttons.keys.forEach((key) => {
        Buttons[keys] = undefined;
      });
      buttons.keys = [];
    } catch (e) {
      throw Error(`UIClearing: ${e}`);
    }
  };
  var Sandbox = {
    state: "edit",
    gui: {},
    start: function () {
      var state = Scenes.Sandbox.state;
      Scenes.Clear();
      currentLoop = "Sandbox";
      if (state === "play") {
        addButton("Edit", 10, 10, 80, 80, function () {
          state = "edit";
          Scenes.Sandbox.start();
        }););
      } else if (state === "edit") {
        //Runner.stop(runner);
        addButton("Play", 10, 10, 80, 80, function () {
          Scenes.Sandbox.state = "play";
          Scenes.Sandbox.start();
        });
      }
    },
    loop: function () {
     
      //var list = Composite.allBodies(world);
    }
  };
})();

export default Scenes;
