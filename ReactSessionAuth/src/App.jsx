import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import TodoList from "./components/Todo/TodoList";
import CreateTodo from "./components/Todo/CreateTodo";
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <nav>
        {!authenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/todos">Todos</Link>
            <Link to="/todos/new">Create Todo</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </nav>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            {authenticated ? (
              <>
                <Route path="/todos" element={<TodoList />} />
                <Route path="/todos/new" element={<CreateTodo />} />
                <Route
                  path="/logout"
                  element={<Logout setAuthenticated={setAuthenticated} />}
                />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
