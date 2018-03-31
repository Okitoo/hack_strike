package models

import "github.com/davidnarayan/go-flake"

var FlakeGen *flake.Flake

func init(){
	FlakeGen, _ = flake.New()
}
