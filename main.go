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
	MessageID int    `json:"message_id"`
	Username  string `json:"username"`
	Message   string `json:"message"`
	Created   string `json:"created_at"`
}
type reply struct {
	ID        int    `json:"id"`
	MessageID int    `json:"message_id"`
	CommentID int    `json:"comment_id"`
	Username  string `json:"username"`
	Message   string `json:"message"`
	Created   string `json:"created_at"`
}
type post struct {
	Messages []message
	Comments []comment
	Replies  []reply
}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/api/forum", forum)
	http.HandleFunc("/api/forum/messages", fp)
	http.HandleFunc("/api/forum/messages/comments", cp)
	http.HandleFunc("/api/forum/messages/comments/replies", rp)
	http.ListenAndServe(":8080", nil)
}

func home(w http.ResponseWriter, req *http.Request) {
	// Set template here for index or seperate?
	io.WriteString(w, "Home")
}
func forum(w http.ResponseWriter, req *http.Request) {
	replies := make([]reply, 0)
	messages := make([]message, 0)
	comments := make([]comment, 0)
	// response json
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	// Pull data from DB
	rows, err := db.Query("SELECT * from messages")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		m := message{}
		err = rows.Scan(&m.ID, &m.Username, &m.Message, &m.Created)
		if err != nil {
			panic(err)
		}
		messages = append(messages, m)
	}
	for i := len(messages)/2 - 1; i >= 0; i-- {
		opp := len(messages) - 1 - i
		messages[i], messages[opp] = messages[opp], messages[i]
	}

	// Pull data from Comment
	rows, err = db.Query("SELECT * from comments")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		c := comment{}
		err = rows.Scan(&c.ID, &c.MessageID, &c.Username, &c.Message, &c.Created)
		if err != nil {
			panic(err)
		}
		comments = append(comments, c)
	}
	// Pull data from Replies
	rows, err = db.Query("SELECT * from replies")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		r := reply{}
		err = rows.Scan(&r.ID, &r.MessageID, &r.CommentID, &r.Username, &r.Message, &r.Created)
		if err != nil {
			panic(err)
		}
		replies = append(replies, r)
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
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Reading Request", http.StatusInternalServerError)
		return
	}
	// decode json
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Parsing Json", http.StatusInternalServerError)
		return
	}

	msg := message{}
	msg.Username = data.Username
	msg.Message = data.Message

	// Post data to DB
	_, err = db.Exec("INSERT INTO messages (USERNAME, MESSAGE) VALUES ($1, $2)", msg.Username, msg.Message)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Posting Request", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.WriteHeader(http.StatusCreated)
}
func cp(w http.ResponseWriter, req *http.Request) {
	// post data - convert json to go
	var data comment
	// json to []byte
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Reading Request", http.StatusInternalServerError)
		return
	}
	// decode json
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Parsing Json", http.StatusInternalServerError)
		return
	}

	comments := comment{}
	comments.MessageID = data.MessageID
	comments.Username = data.Username
	comments.Message = data.Message

	// Post data to DB
	_, err = db.Exec("INSERT INTO comments (MESSAGE_ID,USERNAME, MESSAGE) VALUES ($1, $2, $3)", comments.MessageID, comments.Username, comments.Message)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Posting Request", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.WriteHeader(http.StatusCreated)
}
func rp(w http.ResponseWriter, req *http.Request) {
	// post data - convert json to go
	var data reply
	// json to []byte
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Reading Request", http.StatusInternalServerError)
		return
	}
	// decode json
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Parsing Json", http.StatusInternalServerError)
		return
	}

	replies := reply{}
	replies.Username = data.Username
	replies.Message = data.Message
	replies.MessageID = data.MessageID
	replies.CommentID = data.CommentID

	// Post data to DB
	_, err = db.Exec("INSERT INTO replies (COMMENT_ID, MESSAGE_ID,USERNAME, MESSAGE) VALUES ($1, $2, $3, $4)", replies.CommentID, replies.MessageID, replies.Username, replies.Message)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(500)+" Issue with Posting Request", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.WriteHeader(http.StatusCreated)
}
