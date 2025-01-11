package com.urbanaisle.store.auth.repositories;

import com.urbanaisle.store.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserDetailRepository extends JpaRepository<User, Long> {

    User findByEmail(String username);
}
