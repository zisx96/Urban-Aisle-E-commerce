package com.urbanaisle.store.auth.controller;

import com.urbanaisle.store.auth.config.JWTTokenHelper;
import com.urbanaisle.store.auth.entities.User;
import com.urbanaisle.store.auth.services.OAuth2Service;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.dialect.JsonHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/oauth2")
public class OAuth2Controller {

    @Autowired
    private OAuth2Service oAuth2Service;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    @GetMapping("/success")
    public void callbackOAuth2(@AuthenticationPrincipal OAuth2User oAuth2User, HttpServletResponse response) throws IOException {

        String userName = oAuth2User.getAttribute("email");
        User user = oAuth2Service.getUser(userName);

        if(null == user){
            user = oAuth2Service.createUser(oAuth2User,"google");
        }

        String token = jwtTokenHelper.generateToken(user.getUsername());

        response.sendRedirect("http://localhost:3000/oauth2/callback?token="+token);

    }

}
