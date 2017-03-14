package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

type message struct {
	User    string `json:"user"`
	Message string `json:"message"`
}

func home(w http.ResponseWriter, req *http.Request) {
	// Set template here for index or seperate?
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
func fp(w http.ResponseWriter, req *http.Request) {
	// post data - conver json to go
	var data message
	// json to []byte
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		panic(err)
	}
	// decode json
	err = json.Unmarshal(body, &data)
	if err != nil {
		panic(err)
	}

	fmt.Println(data)
}

func init() {

}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/api/forum", forum)
	http.HandleFunc("/api/forum/new", fp)
	http.ListenAndServe(":8080", nil)
}
