package main

import (
	"io"
	"net/http"
)

func home(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, "Test")
}

func main() {
	http.HandleFunc("/", home)
	http.ListenAndServe(":8080", nil)
}
