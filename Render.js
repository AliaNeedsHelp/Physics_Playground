/* eslint-disable no-undef, no-unused-vars */

/*
var Render = {
  size: { x: 600, y: 600 },
  resize: function (x, y) {
    this.size = { x: x, y: y };
    this.graphics.size(x, y);
  },
  enabled: true,
  cache: {},
  graphics: CreateGraphics(100, 100),
  reload: function (paths) {
    try {
      var itemsLeft = paths.length;
      paths.forEach(
        (path) =>
          (this.cache[path] = loadImage(path, (_e) => {
            itemsLeft--;
            console.debug(`${path} Loaded Successfully`);
            if (itemsLeft === 0) Render.enabled = true;
          }))
      );
    } catch (e) {
      console.debug(e);
    }
  },
  run: function () {
    if (!enabled) {
      this.reload();
      return;
    }
    var cg = this.graphics,
      siz = cg.size();
    bodies = Composite.allBodies(engine.world);

    cg.reset();
    cg.fill("gray");
    cg.rect(0, 0, siz.x, siz.y);

    for (var i = 0; i < bodies.length; i += 1) {
      var vertices = bodies[i].vertices;

      cg.stroke("black");
      cg.fill(bodies[i].render.fillStyle);

      beginShape();

      for (var j = 1; j < vertices.length; j += 1) {
        cg.vertex(vertices[j].x, vertices[j].y);
      }

      cg.endShape(CLOSE);

      console.debug(cg);
      return cg;
    }
  }
};
*/