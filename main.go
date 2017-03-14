package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

type message struct {
	User    string
	Message string
}

func home(w http.ResponseWriter, req *http.Request) {
	// Set template here
	io.WriteString(w, "Home")
}
func forum(w http.ResponseWriter, req *http.Request) {
	// response json
	w.Header().Set("Content-Type", "application/json")
	msg := message{
		User:    "HitchHiker",
		Message: "Awnser to Life is 42",
	}
	json, err := json.Marshal(msg)
	if err != nil {
		log.Println(err)
	}
	w.Write(json)
}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/api/", forum)
	http.ListenAndServe(":8080", nil)
}
