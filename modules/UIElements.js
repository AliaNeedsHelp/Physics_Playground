/* eslint-disable no-undef, no-unused-vars */

var Buttons = {};

var Gui = {};

module.exports = Buttons;
module.exports = Gui;

(function() {
  Buttons.create = function(name, X, Y, W, H, callback) {
    var button = {
      name: name,
      bounds: Bounds.create([
        { x: X, y: Y },
        { x: X + W, y: Y },
        { x: X + W, y: Y + H },
        { x: X, y: Y + H }
      ]),
      callback: callback,
			fill: "green",
			type: "button"
    };
    return button;
  };
	Buttons.render = function (c, gui) {
		c.textAlign = "center";
		c.fillStyle = "white";
		c.font = "25px sans";
		var bounds, middle;
		gui.forEach((button) => {
			bounds = button.bounds;
			c.strokeStyle = "black";
			c.fillStyle = button.fill;
			c.fillRect(bounds.min.x, bounds.min.y, bounds.max.x, bounds.max.y);

			middle = {
				x: bounds.max.x + bounds.min.x,
				y: bounds.max.y + bounds.min.y
			};
			c.fillText(button.name, middle.x / 2, middle.y / 2);
		});
	};


})();