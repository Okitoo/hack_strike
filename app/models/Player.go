package models

import (
	"github.com/revel/revel"
	"github.com/rami-dabain/concurrent-map"
)

var Players = cmap.New()

type Player struct{
	X float64 `json:"x"`
	Y float64 `json:"y"`

	ID string `json:"i"`
	Ws revel.ServerWebSocket `json:"-"`
}
