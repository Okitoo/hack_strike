function hPlayer(scene){

    // This is where you create and manipulate meshes
    var body = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

    this.direction = new BABYLON.Vector3(0,0,0);

    this.moveLeft = function(move){
        if (move) {
            this.direction.x = 0.05;
        }else{
            this.direction.x = 0;
        }
    };

    this.moveRight = function(move){
        if (move) {
            this.direction.x = -0.05;
        }else{
            this.direction.x = 0;
        }
    };

    this.moveUp = function(move){
        if (move) {
            this.direction.z = -0.05;
        }else{
            this.direction.z = 0;
        }
    };
    this.moveDown = function(move){
        if (move) {
            this.direction.z = 0.05;
        }else{
            this.direction.z = 0;
        }
    };

    this.render = function(){
            body.position.x += this.direction.x;
            body.position.z += this.direction.z;
    }
}
