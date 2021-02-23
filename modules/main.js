/* eslint-disable no-undef, no-unused-vars */

new p5(); // Prematurely instantiates p5.js so its props are available now.
window._setupDone = undefined; // Blocks duplicate instantiation warn.

var Scenes = require('./scenes.js');
var Gui = require('./UIElements.js');
var Buttons = require('./UIElements.js');

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

Scenes.Sandbox.start();

function draw() {
	try {
		//if (Render) throw new Error("Required");
		Engine.update(engine, deltaTime);
		Render.world(render);
		//if (currentLoop !== "None") Scenes[Scenes.currentLoop].loop();
		Buttons.render(render.context, Scenes.Sandbox.gui);
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
