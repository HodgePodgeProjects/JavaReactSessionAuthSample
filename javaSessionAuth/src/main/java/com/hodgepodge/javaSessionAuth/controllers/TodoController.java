package com.hodgepodge.javaSessionAuth.controllers;

import com.hodgepodge.javaSessionAuth.models.Todo;
import com.hodgepodge.javaSessionAuth.models.User;
import com.hodgepodge.javaSessionAuth.repositories.TodoRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserController userController;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(HttpSession session) {
        User user = userController.getUserFromSession(session);
        if (user != null) {
            List<Todo> todos = todoRepository.findByUser(user);
            return ResponseEntity.ok(todos);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteTodo(@RequestParam int todoId) {
        Map<String, String> responseBody = new HashMap<>();
        if (todoRepository.existsById(todoId)) {
            todoRepository.deleteById(todoId);
            responseBody.put("message", "Todo successfully deleted");
            return ResponseEntity.ok(responseBody);
        } else {
            responseBody.put("message", "Todo not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }

    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> createTodo(HttpSession session,
                                                          @RequestParam String description,
                                                          @RequestParam String assigned) {
        User user = userController.getUserFromSession(session);
        Map<String, String> responseBody = new HashMap<>();
        if (user != null) {
            Todo newTodo = new Todo();
            newTodo.setDescription(description);
            newTodo.setAssigned(assigned);
            newTodo.setUser(user);
            todoRepository.save(newTodo);
            responseBody.put("message", "Todo successfully created");
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        } else {
            responseBody.put("message", "User not found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }
}
