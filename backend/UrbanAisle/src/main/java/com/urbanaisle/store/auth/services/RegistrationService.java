package com.urbanaisle.store.auth.services;

import com.urbanaisle.store.auth.dto.RegistrationRequest;
import com.urbanaisle.store.auth.dto.RegistrationResponse;
import com.urbanaisle.store.auth.entities.Authority;
import com.urbanaisle.store.auth.entities.User;
import com.urbanaisle.store.auth.helper.VerificationCodeGenerator;
import com.urbanaisle.store.auth.repositories.AuthorityRepository;
import com.urbanaisle.store.auth.repositories.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

@Service
public class RegistrationService {

    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private EmailService emailService;

    public RegistrationResponse createUser(RegistrationRequest registrationRequest){

        User existingUser = userDetailRepository.findByEmail(registrationRequest.getEmail());

        if(null != existingUser){

            return RegistrationResponse.builder()
                    .code(400)
                    .message("Email already Exist")
                    .build();
        }

        try{

            User user = new User();
            user.setFirstName(registrationRequest.getFirstName());
            user.setLastName(registrationRequest.getLastName());
            user.setEmail(registrationRequest.getEmail());
            user.setEnabled(false);
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setProvider("manual");

            String code = VerificationCodeGenerator.generateCode();

            user.setVerificationCode(code);
            user.setAuthorities(authorityService.getUserAuthority());
            userDetailRepository.save(user);

            // Logic method to send mail
            emailService.sendMail(user);

            return RegistrationResponse.builder().code(200)
                    .message("user created")
                    .build();

        }
        catch (Exception e){

            throw  new ServerErrorException(e.getMessage(),e.getCause());
        }
    }
}
