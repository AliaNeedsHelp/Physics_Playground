/* eslint-disable no-undef, no-unused-vars */

new p5(); // Prematurely instantiates p5.js so its props are available now.
window._setupDone = undefined; // Blocks duplicate instantiation warn.

// module aliases
var Engine = Matter.Engine,
	Render = Matter.Render,
	World = Matter.World,
	Body = Matter.Body,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite,
	Mouse = Matter.Mouse,
	Bounds = Matter.Bounds,
	Detector = Matter.Detector,
	Sleeping = Matter.Sleeping,
	Vertices = Matter.Vertices;

var gamePack = null;

function preload() {
	try {
		gamePack = loadJSON("packs/VanillaParts.json", (json) => {
			//Render.reload(json.textures);
		});
		//IMGguiList = loadJSON("packs/IMGguiList.json");
	} catch (e) {
		throw Error(`Loading: ${e}`);
	}
}

var engine = Engine.create(),
	world = engine.world;

var render = Render.create({
	engine: engine,
	element: document.body,
	options: {
		wireframes: false
	}
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(world, [boxA, boxB, ground]);
//try{
var mouse = Mouse.create(render.canvas);
//}catch(e){console.log(e);}
var mouseConstraint = {
	body: null,
	offset: { x: 0, y: 0 },
	angle: 0,
	collisionFilter: {
		category: 0x0001,
		mask: 0xffffffff,
		group: 0
	},
	update: function () {
		var bodies = Composite.allBodies(world),
			body = this.body;
		if (mouse.button === 0) {
			if (!body) {
				for (var i = 0; i < bodies.length; i++) {
					body = bodies[i];
					if (
						Bounds.contains(body.bounds, mouse.position) &&
						Detector.canCollide(body.collisionFilter, this.collisionFilter)
					) {
						for (
							var j = body.parts.length > 1 ? 1 : 0;
							j < body.parts.length;
							j++
						) {
							var part = body.parts[j];
							if (Vertices.contains(part.vertices, mouse.position)) {
								this.offset = {
									x: mouse.position.x - body.position.x,
									y: mouse.position.y - body.position.y
								};
								this.angle = body.angle;

								Sleeping.set(body, false);

								break;
							}
						}
					}
				}
			} else {
				Body.setPosition(body, {
					x: mouse.position.x + this.offset.x,
					y: mouse.position.y + this.offset.y
				});
			}
		} else {
			this.body = null;
		}
	}
};

//On-Demand sprite body spawning w/ gamePack refs
var CreateObject = function (item, X, Y) {
	var body = gamePack[item];
	if (!body) return null;
	body = Bodies.fromVertices(X, Y, body.vertices, body);
	World.addBody(world, body);
	return body;
};

var buttons = {
	keys: [],
	render: function (c) {
		c.textAlign = "center";
		c.fillStyle = "white";
		c.font = "25px sans";
		var button, bounds, middle;
		this.keys.forEach((item) => {
			button = buttons[item];
			bounds = button.bounds;
			c.strokeStyle = button.stroke;
			c.fillStyle = button.fill;
			c.fillRect(bounds.min.x, bounds.min.y, bounds.max.x, bounds.max.y);

			middle = {
				x: bounds.max.x + bounds.min.x,
				y: bounds.max.y + bounds.min.y
			};
			c.fillText(button.name, middle.x / 2, middle.y / 2);
		});
	}
};

function addButton(name, X, Y, W, H, callback) {
	var button = {
		name: name,
		bounds: Bounds.create([
			{ x: X, y: Y },
			{ x: X + W, y: Y },
			{ x: X + W, y: Y + H },
			{ x: X, y: Y + H }
		]),
		callback: callback,
		stroke: "black",
		fill: "green"
	};
	buttons[name] = button;
	buttons.keys.push(name);
}

function mouseClicked() {
	var button;
	mouse = mouse.position;
	for (var i = 0; i < buttons.keys.length; i++) {
		button = buttons[buttons.keys[i]];
		if (Bounds.contains(button.bounds, mouse.position)) {
			button.callback();
		}
	}
}

var Guis = {
	PartSelector: {
		start: function () {
			if (!gamePack) return;
			try {
				console.debug(typeof gamePack.keys);
				gamePack.keys.forEach((key, index) => {
					addButton(item.label, index * 110, 10, 80, 80, (key, _index) => {
						CreateObject(key, 200, 200);
					});
				});
			} catch (e) {
				throw Error(`PartSelector: ${e}`);
			}
		}
		//loop: function () {}
	}
};

var Scenes = {
	currentLoop: "None",
	Clear: function () {
		try {
			buttons.keys.forEach((key) => {
				buttons[keys] = undefined;
			});
			buttons.keys = [];
		} catch (e) {
			throw Error(`UIClearing: ${e}`);
		}
	},
	Sandbox: {
		state: "edit",
		start: function () {
			var state = Scenes.Sandbox.state;
			Scenes.Clear();
			currentLoop = "Sandbox";
			if (state === "play") {
				addButton("Edit", 10, 10, 80, 80, function () {
					state = "edit";
					Scenes.Sandbox.start();
				});
			} else if (state === "edit") {
				//Runner.stop(runner);
				addButton("Play", 10, 10, 80, 80, function () {
					Scenes.Sandbox.state = "play";
					Scenes.Sandbox.start();
				});
				Guis.PartSelector.start();
			}
		},
		loop: function () {
			if (Scenes.Sandbox.state === "edit") {
				mouseConstraint.update();
			}
			//var list = Composite.allBodies(world);
		}
	}
};

Scenes.Sandbox.start();

function draw() {
	try {
		//if (Render) throw new Error("Required");
		Engine.update(engine, deltaTime);
		Render.world(render);
		//if (currentLoop !== "None") Scenes[Scenes.currentLoop].loop();
		buttons.render(render.context);
		/*
    fill("green");
    ellipseMode(RADIUS);
    ellipse(mouseX, mouseY, 10, 10);
    */
		//console.debug(frameRate);
	} catch (e) {
		throw Error(`Loop: ${e}`);
	}
}
