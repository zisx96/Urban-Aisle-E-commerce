package com.urbanaisle.store.services;

import com.urbanaisle.store.auth.entities.User;
import com.urbanaisle.store.dto.AddressDto;
import com.urbanaisle.store.entities.Address;
import com.urbanaisle.store.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class AddressService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AddressRepository addressRepository;

    public Address createAddress(AddressDto addressDto, Principal principal){

        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        Address address = Address.builder()
                .name(addressDto.getName())
                .street(addressDto.getStreet())
                .city(addressDto.getCity())
                .state(addressDto.getState())
                .zipCode(addressDto.getZipCode())
                .phoneNumber(addressDto.getPhoneNumber())
                .user(user)
                .build();

        return addressRepository.save(address);
    }
}
