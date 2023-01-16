AFRAME.registerComponent("paintballs", {
    init: function(){
        this.shootPaintballs();
    },
    shootPaintballs: function(){
        window.addEventListener("keydown", (e) => {
            if(e.key === "z"){
                var paintball = document.createElement("a-entity");

                paintball.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.1
                });

                paintball.setAttribute("material", "color", "black");

                //adjusting the paintball shooting position
                var cam = document.querySelector("#camera-rig");
                pos = cam.getAttribute("position");

                paintball.setAttribute("position", {
                    x: pos.x,
                    y: pos.y + 1,
                    z: pos.z - 0.5
                });

                var camera = document.querySelector("#camera").object3D;

                //getting the camera direction as Three.js vector
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                //setting the velocity and its direction
                paintball.setAttribute("velocity", direction.multiplyScalar(-10));

                var scene = document.querySelector("#scene");

                //setting the paintball as a dynamic body
                paintball.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0"
                });

                this.shootSound();

                //adding the collide event listener to the paintball
                paintball.addEventListener("collide", (e) => {
                    this.removePaintball(e);
                    var paintSplatterEl = document.createElement("a-entity");
                    paintSplatterEl.setAttribute("gltf-model", "./model/paint-splash/scene.gltf");

                    var scale = { x: 30, y: 30, z: 30 };
                    paintSplatterEl.setAttribute("scale", scale);

                    paintSplatterEl.setAttribute("rotation", { x: 90, y: 0, z: 0 });

                    paintSplatterEl.setAttribute("static-body", {});

                    paintSplatterEl.setAttribute("position", paintball.getAttribute("position"));
            
                    var sceneEl = document.querySelector("#scene");
                    sceneEl.appendChild(paintSplatterEl);
                });

                scene.appendChild(paintball);
            }
        });
    },
    removePaintball: function(e){
        //Original entity (paintball)
        console.log(e.detail.target.el);

        //Other entity which the paintball touched.
        console.log(e.detail.body.el);

        //paintball element
        var element = e.detail.target.el;

        //element which is hit
        var elementHit = e.detail.body.el;

        if(elementHit.id.includes("wall") || elementHit.id.includes("ground")){
            elementHit.setAttribute("material", {
                opacity: 1,
                transparent: true
            });

            //impulse and point vector
            var impulse = new CANNON.Vec3(-2, 2, 1);
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"));
            
            elementHit.body.applyImpulse(impulse, worldPoint);

            //remove event listener
            element.removeEventListener("collide", this.removePaintball);

            //playing the splash sound effect whenever the paintball collides with any wall
            var entity = document.querySelector("#sound1");
            entity.components.sound.playSound();

            //remove the paintballs from the scene
            var scene = document.querySelector("#scene");
            scene.removeChild(element);
        }
    },
    shootSound: function(){
        var entity = document.querySelector("#sound3");
        entity.components.sound.playSound();
    }
});