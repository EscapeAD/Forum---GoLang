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
	Created  string `json:"created_at"`
}
type comment struct {
	ID        int    `json:"id"`
	Messageid int    `json:"message_id"`
	Username  string `json:"username"`
	Message   string `json:"message"`
	Created   string `json:"created_at"`
}
type reply struct {
	ID        int    `json:"id"`
	Messageid int    `json:"message_id"`
	Commentid int    `json:"comment_id"`
	Username  string `json:"username"`
	Message   string `json:"message"`
	Created   string `json:"created_at"`
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
	replies := reply{}
	messages := message{}
	comments := comment{}
	// response json
	w.Header().Set("Content-Type", "application/json")
	// Pull data from DB
	rows, err := db.Query("SELECT * from messages")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&messages.ID, &messages.Username, &messages.Message, &messages.Created)
		if err != nil {
			panic(err)
		}
	}
	// Pull data from Comment
	rows, err = db.Query("SELECT * from comments")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&comments.ID, &comments.Messageid, &comments.Username, &comments.Message, &comments.Created)
		if err != nil {
			panic(err)
		}
	}
	// Pull data from Replies
	rows, err = db.Query("SELECT * from replies")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&replies.ID, &replies.Messageid, &replies.Commentid, &replies.Username, &replies.Message, &replies.Created)
		if err != nil {
			panic(err)
		}
	}
	posts := post{messages, comments, replies}
	// Convert to json
	json, err := json.Marshal(posts)
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
