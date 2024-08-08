import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/todos",{withCredentials:true});
        setTodos(response.data);
      } catch (error) {
        setMessage("Failed to load todos");
      }
    };

    fetchTodos();
  }, []);

  const deleteTodo = async (todoId) => {
    try {
      await axios.post("http://localhost:8080/todos/delete", null, {
        params: { todoId },
        withCredentials: true
      });
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      setMessage("Failed to delete todo");
    }
  };

  return (
    <div>
      <h2>Your Todos</h2>
      {message && <p>{message}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.description} (Assigned to: {todo.assigned})
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
