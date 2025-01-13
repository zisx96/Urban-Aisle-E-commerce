package com.urbanaisle.store.auth.controller;

import com.urbanaisle.store.auth.config.JWTTokenHelper;
import com.urbanaisle.store.auth.dto.LoginRequest;
import com.urbanaisle.store.auth.dto.RegistrationRequest;
import com.urbanaisle.store.auth.dto.RegistrationResponse;
import com.urbanaisle.store.auth.dto.UserToken;
import com.urbanaisle.store.auth.entities.Authority;
import com.urbanaisle.store.auth.entities.User;
import com.urbanaisle.store.auth.services.AuthorityService;
import com.urbanaisle.store.auth.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

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

                String token = jwtTokenHelper.generateToken(user.getEmail());
                UserToken userToken = UserToken.builder().token(token).build();
                return new ResponseEntity<>(userToken, HttpStatus.OK);
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

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> map){
        String username = map.get("userName");
        String code = map.get("code");

        User user = (User) userDetailsService.loadUserByUsername(username);
        if(null != user && user.getVerificationCode().equals(code)){

            registrationService.verifyUser(username);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/role")
    public ResponseEntity<Authority> setRole(@RequestBody Authority authority){

        Authority authority1 = authorityService.createAuthority(authority.getRoleCode(), authority.getRoleDescription());

        return new ResponseEntity<>(authority1, HttpStatus.OK);
    }
}
