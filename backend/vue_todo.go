package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/google/uuid"
)

type Todo struct {
	ID      string `json:"id"`
	Checked bool   `json:"checked"`
	Subject string `json:"subject"`
}

func main() {
	s := Server{
		todos: []Todo{
			Todo{
				ID:      uuid.New().String(),
				Checked: false,
				Subject: "Learn Vue.js with Vuex state management",
			},
		},
	}

	http.Handle("/", http.FileServer(http.Dir("public")))
	http.HandleFunc("/todos", s.handleTodos)
	http.ListenAndServe(":8080", nil)
}

type Server struct {
	todos []Todo
}

func (s *Server) handleTodos(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		buf, err := json.Marshal(s.todos)
		if err != nil {
			log.Fatalf("marshal: %v", err)
		}
		_, _ = w.Write(buf)
	case "POST":
		var todos []Todo

		buf, _ := ioutil.ReadAll(r.Body)
		err := json.Unmarshal(buf, &todos)
		if err != nil {
			log.Fatalf("unmarshal: %v", err)
		}

		s.todos = todos
	}
}
