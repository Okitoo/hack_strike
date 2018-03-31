package models

func PlayerConnected(player *Player){
	Broadcast(Hack_strike_packet{
		Function:"player_joined",
		Data:player,
	})

	player.Ws.MessageSendJSON(Hack_strike_packet{
		Function:"player_list",
		Data:Players.GetMap(),
	})


	Players.Set(player.ID, player)
}

func PlayerDisconnected(player *Player){
	Players.Remove(player.ID)
}

func Broadcast(packet Hack_strike_packet){
	for _, pI := range Players.Items(){
		if player, ok := pI.(*Player); ok{
			go player.Ws.MessageSendJSON(packet)
		}
	}
}
