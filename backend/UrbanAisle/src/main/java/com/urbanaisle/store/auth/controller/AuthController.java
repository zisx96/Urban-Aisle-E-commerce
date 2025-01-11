package com.urbanaisle.store.auth.controller;

import com.urbanaisle.store.auth.dto.LoginRequest;
import com.urbanaisle.store.auth.dto.RegistrationRequest;
import com.urbanaisle.store.auth.dto.RegistrationResponse;
import com.urbanaisle.store.auth.dto.UserToken;
import com.urbanaisle.store.auth.entities.User;
import com.urbanaisle.store.auth.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/login")
    public ResponseEntity<UserToken> login(@RequestBody LoginRequest loginRequest){

        try{
            Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getUserName(),
                    loginRequest.getPassword());

            Authentication authResponse = this.authenticationManager.authenticate(authentication);

            if(authResponse.isAuthenticated()){
                User user = (User) authResponse.getPrincipal();

                if(!user.isEnabled()){

                    return  new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }

                // generate Jwt Token

                String token = null;
                UserToken userToken = UserToken.builder().token(token).build();
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        catch (BadCredentialsException e){

            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest registrationRequest){

        RegistrationResponse response = registrationService.createUser(registrationRequest);

        return new ResponseEntity<>(response,
                response.getCode() == 200 ? HttpStatus.OK: HttpStatus.BAD_REQUEST);
    }
}
