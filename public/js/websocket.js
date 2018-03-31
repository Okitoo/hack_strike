function startWS() {
    if (window.location.protocol == "https:") {
        wsg = new WebSocket('wss://' + window.location.host + '/ws/connect');
    } else {
        wsg = new WebSocket('ws://' + window.location.host + '/app/ws');
    }

    wsg.onopen = function () {
        alert("connected");
    };
    wsg.onmessage = function (e) {
        try {
            var jsonDataX = JSON.parse(e.data)
            f = wsg_actions[jsonDataX["f"]];
            f(jsonDataX["d"]);
        } catch (e) {
            return false
        }
    };

    wsg.onclose = function () {
        setTimeout(function () {
            wsg = null;
            delete(wsg);
            startWSG();
        }, 3000);
    };
}

var Players = {};


var wsg_actions = {
    "player_joined": player_joined,
    "player_list": player_list,
};

function player_joined(data){
    var player = new hPlayer(scene);

    Players[player["i"]] = player;
}

function player_list(data){
    for (i in data){
        player_joined(data[i]);
    }
}