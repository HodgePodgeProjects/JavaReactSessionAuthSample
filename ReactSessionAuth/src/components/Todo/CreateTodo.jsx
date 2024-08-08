import React, { useState } from "react";
import axios from "axios";

function CreateTodo() {
  const [description, setDescription] = useState("");
  const [assigned, setAssigned] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/todos/new",
        null,
        {
          params: { description, assigned },
          withCredentials:true
        }
      );
      setMessage(response.data.message);
      setDescription("");
      setAssigned("");
    } catch (error) {
      setMessage("Failed to create todo");
    }
  };

  return (
    <div>
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          value={assigned}
          onChange={(e) => setAssigned(e.target.value)}
          placeholder="Assigned to"
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateTodo;
