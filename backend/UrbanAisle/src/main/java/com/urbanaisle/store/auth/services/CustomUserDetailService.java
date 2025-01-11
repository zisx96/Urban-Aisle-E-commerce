package com.urbanaisle.store.auth.services;

import com.urbanaisle.store.auth.entities.User;
import com.urbanaisle.store.auth.repositories.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserDetailRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);
        if(null == user){
            throw new UsernameNotFoundException("User with username Not Found "+ username);
        }

        return user;
    }
}
