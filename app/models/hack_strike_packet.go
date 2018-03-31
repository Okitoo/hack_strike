package models

type Hack_strike_packet struct{
	Function string `json:"f"`
	Data interface{} `json:"d"`
}
