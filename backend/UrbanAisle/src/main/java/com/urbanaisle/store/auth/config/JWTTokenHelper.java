package com.urbanaisle.store.auth.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JWTTokenHelper {

    @Value("${jwt.auth.app}")
    private String app;

    @Value("${jwt.auth.secret_key}")
    private String secret;

    @Value("${jwt.auth.expires_in}")
    private int expiresIn;

    public String generateToken(String userName){

        return Jwts.builder()
                .setIssuer(app)
                .setSubject(userName)
                .setIssuedAt(new Date())
                .setExpiration(generateExpirationDate())
                .signWith(getSigningKey())
                .compact();
    }

    private Key getSigningKey() {

        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Date generateExpirationDate() {

        return new Date(new Date().getTime() + expiresIn * 1000L);
    }

    public String getToken(HttpServletRequest request) {

        String authHead = getAuthHeader(request);
        if(authHead != null && authHead.startsWith("Bearer")){
            
            return authHead.substring(7);
        }
        
        return authHead;
    }

    public Boolean validateToken(String token, UserDetails userDetails){

        final String username = getUserName(token);

        return (
                username != null &&
                        username.equals(userDetails.getUsername()) &&
                        !isTokenExpired(token)
                );
    }

    private boolean isTokenExpired(String token) {

        Date expire = getExpirationDate(token);
        return expire.before(new Date());
    }

    private Date getExpirationDate(String token) {

        Date expireDate;

        try{
            final Claims claims = this.getAllClaimsFromToken(token);
            expireDate = claims.getExpiration();
        }
        catch (Exception e){

            expireDate = null;
        }
        return expireDate;
    }

    private String getAuthHeader(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    public String getUserName(String authToken) {

        String username;

        try {
            final Claims claim = this.getAllClaimsFromToken(authToken);
            username = claim.getSubject();
        }   catch (Exception e){
            username = null;
        }
        return username;
    }

    private Claims getAllClaimsFromToken(String token){

        Claims claims;

        try{
            claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }
        catch (Exception e){

            claims = null;
        }
        return claims;
    }
}
