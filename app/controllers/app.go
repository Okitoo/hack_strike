package controllers

import (
	"github.com/revel/revel"
	"time"
	"okitoo/hack_strike/app/models"
)

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	return c.Render()
}

func (c App) Ws(user string, ws revel.ServerWebSocket) revel.Result {
	if ws == nil{
		return nil
	}


	//we are connected
	newIdFlake := models.FlakeGen.NextId()

	player := models.Player{
		Ws:ws,
		X:0,
		Y:0,
		ID:newIdFlake.String(),
	}


	pinger := time.NewTicker(time.Second * 1)
	defer func(){//the websocket is disconnected
		// we are disconnected
		pinger.Stop()
		models.PlayerDisconnected(&player)
	}()

	models.PlayerConnected(&player)

	go func(){
		for range pinger.C{
			ws.MessageSendJSON([]byte{})
		}
	}()

	var msg string
	for {
		err := ws.MessageReceiveJSON(&msg)
		if err != nil{
			return nil
		}
	}

	return nil
}
