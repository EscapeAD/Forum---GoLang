package main

import (
	"io"
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

}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/api/", forum)
	http.ListenAndServe(":8080", nil)
}
