package com.urbanaisle.store.auth.services;

import com.urbanaisle.store.auth.entities.Authority;
import com.urbanaisle.store.auth.repositories.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> getUserAuthority(){
        List<Authority> authorityList = new ArrayList<>();
        Authority authority = authorityRepository.findByRoleCode("User");
        authorityList.add(authority);

        return authorityList;
    }

    public Authority createAuthority(String role,String description){

        Authority authority = Authority.builder()
                .roleCode(role).roleDescription(description)
                .build();

        return authorityRepository.save(authority);
    }

}
