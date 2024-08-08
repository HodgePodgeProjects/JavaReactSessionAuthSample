package com.hodgepodge.javaSessionAuth.repositories;

import com.hodgepodge.javaSessionAuth.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}
