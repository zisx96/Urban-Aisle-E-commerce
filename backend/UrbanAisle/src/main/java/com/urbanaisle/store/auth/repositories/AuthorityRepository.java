package com.urbanaisle.store.auth.repositories;

import com.urbanaisle.store.auth.entities.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AuthorityRepository extends JpaRepository<Authority, UUID> {
    Authority findByRoleCode(String user);
}
