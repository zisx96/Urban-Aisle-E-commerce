package com.urbanaisle.store.auth.controller;

import com.urbanaisle.store.auth.dto.UserDetailsDto;
import com.urbanaisle.store.auth.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Authorization")
@RequestMapping("/api/user")
public class UserDetailController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/profile")
    public ResponseEntity<UserDetailsDto> getUserProfile(Principal principal){

        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        if(null == user){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        UserDetailsDto userDetailsDto = UserDetailsDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .id(user.getId())
                .phoneNumber(user.getPhoneNumber())
                .addressList(user.getAddressList())
                .authorityList(user.getAuthorities().toArray())
                .build();

        return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);
    }

}
