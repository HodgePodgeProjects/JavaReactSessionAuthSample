package com.hodgepodge.javaSessionAuth.repositories;

import com.hodgepodge.javaSessionAuth.models.Todo;
import com.hodgepodge.javaSessionAuth.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TodoRepository extends CrudRepository<Todo, Integer> {

    List<Todo> findByUser(User user);

}
