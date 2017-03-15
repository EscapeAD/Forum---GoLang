package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

var db *sql.DB

func init() {
	// initate DB
	var err error
	db, err = sql.Open("postgres", "postgres://fowner:pass0@localhost/forum?sslmode=disable")
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("connected to Database")
}

type message struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Message  string `json:"message"`
}
type comment struct {
	ID        int    `json:"id"`
	Messageid int    `json:"message_id"`
	Username  string `json:"username"`
	Message   string `json:"message"`
}
type reply struct {
	ID        int    `json:"id"`
	Messageid int    `json:"message_id"`
	Commentid int    `json:"comment_id"`
	Username  string `json:"username"`
	Message   string `json:"message"`
}
type post struct {
	Messages message
	Comments comment
	Replies  reply
}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/api/forum", forum)
	http.HandleFunc("/api/forum/messages", fp)
	// http.HandleFunc("/api/forum/messages/comments", cp)
	// http.HandleFunc("/api/forum/messages/comments/replies", rp)
	http.ListenAndServe(":8080", nil)
}

func home(w http.ResponseWriter, req *http.Request) {
	// Set template here for index or seperate?
	io.WriteString(w, "Home")
}
func forum(w http.ResponseWriter, req *http.Request) {
	// response json
	w.Header().Set("Content-Type", "application/json")
	// Pull data from DB
	rows, err := db.Query("SELECT * from messages")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	msgs := make([]message, 0)
	for rows.Next() {
		msg := message{}
		err = rows.Scan(&msg.ID, &msg.Username, &msg.Message)
		if err != nil {
			log.Println(err)
		}
		msgs = append(msgs, msg)
	}

	json, err := json.Marshal(msgs)
	if err != nil {
		log.Println(err)
	}
	w.Write(json)
}
func fp(w http.ResponseWriter, req *http.Request) {
	// post data - convert json to go
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

	msg := message{}
	msg.Username = data.Username
	msg.Message = data.Message
	fmt.Println(msg)

	// Post data to DB
	_, err = db.Exec("INSERT INTO messages (USERNAME, MESSAGE) VALUES ($1, $2)", msg.Username, msg.Message)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
