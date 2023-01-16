AFRAME.registerComponent("player-movement", {
    init: function(){
        this.walk();
    },
    walk: function(){
        window.addEventListener("keydown", (e) => {
            //playing the footstep sound when any of those arrow keys are pressed
            if(
                e.key === "ArrowUp" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowDown"
            ){
                var entity = document.querySelector("#sound2");
                entity.components.sound.playSound();
            }
        });
    }
});