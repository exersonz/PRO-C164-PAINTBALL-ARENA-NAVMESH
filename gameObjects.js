AFRAME.registerComponent("walls", {
    schema: {
        height: { type: "number", default: 4 },
        width: { type: "number", default: 10 }
    },
    init: function(){
        for(var i = 0; i < 20; i++){
            var wall = document.createElement("a-entity");
            wall.setAttribute("id", "wall" + i);

            //setting position attribute
            posX = Math.random()*200 - 100;
            posY = 1.5;
            posZ = Math.random()*100 - 100;

            position = { x: posX, y: posY, z: posZ };
            wall.setAttribute("position", position);
            
            wall.setAttribute("geometry", {
                primitive: "plane",
                height: this.data.height,
                width: this.data.width
            });

            //setting material attribute
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            wall.setAttribute("material", "color", "#" + randomColor);

            //setting static-body attribute
            wall.setAttribute("static-body", {});

            //append the box to the scene
            var sceneEl = document.querySelector("#scene");
            sceneEl.appendChild(wall);
        }
    }
});