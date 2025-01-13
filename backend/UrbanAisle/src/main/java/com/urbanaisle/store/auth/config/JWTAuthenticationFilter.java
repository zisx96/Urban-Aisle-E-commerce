package com.urbanaisle.store.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JWTTokenHelper jwtTokenHelper;

    public JWTAuthenticationFilter(JWTTokenHelper jwtTokenHelper ,UserDetailsService userDetailsService) {

        this.jwtTokenHelper = jwtTokenHelper;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request,response);
            return;
        }

        try{

            String authToken = jwtTokenHelper.getToken(request);
            if(null != authToken){
                String userName = jwtTokenHelper.getUserName(authToken);
                if(null != userName){
                    UserDetails userDetails = userDetailsService.loadUserByUsername(userName);

                    if(jwtTokenHelper.validateToken(authToken, userDetails)){

                        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                                userDetails,null,
                                userDetails.getAuthorities());

                        token.setDetails(new WebAuthenticationDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(token);
                    }
                }
            }

            filterChain.doFilter(request,response);
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
