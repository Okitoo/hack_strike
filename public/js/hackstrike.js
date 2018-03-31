var scene;
$(document).ready(function(){

    var canvas = document.getElementById("renderCanvas"); // Get the canvas element

    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    var cameraBasePosition = new BABYLON.Vector3(0,35,50);

    var camera;

    var localPlayer;
    /******* Add the create scene function ******/
    var createScene = function () {

        // Create the scene space
        scene = new BABYLON.Scene(engine);

        localPlayer = new hPlayer(scene);

        // Add a camera to the scene and attach it to the canvas
        camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Add lights to the scene
        // var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 10, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 20, 40), scene);

        var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 60, height: 60, subdivsions: 12}, scene); //default ground

        //map
        camera.setPosition(cameraBasePosition);
        camera.setTarget(new BABYLON.Vector3(0,0,0));

        return scene;
    };


    var scene = createScene(); //Call the createScene function

    engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
        localPlayer.render();
        scene.render();
    });

    $(document).keydown(function(e){
        console.log(e.keyCode);
        if (e.keyCode == 65){
            localPlayer.moveLeft(true);
        }

        if (e.keyCode == 87){
            localPlayer.moveUp(true);
        }

        if (e.keyCode == 83){
            localPlayer.moveDown(true);
        }

        if (e.keyCode == 68){
            localPlayer.moveRight(true);
        }
    });

    $(document).keyup(function(e){
        console.log(e.keyCode);
        if (e.keyCode == 65){
            localPlayer.moveLeft(false);
        }
        if (e.keyCode == 87){
            localPlayer.moveUp(false);
        }
        if (e.keyCode == 83){
            localPlayer.moveDown(false);
        }

        if (e.keyCode == 68){
            localPlayer.moveRight(false);
        }
    });

    startWS();
});
