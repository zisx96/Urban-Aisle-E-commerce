package com.urbanaisle.store.controllers;

import com.urbanaisle.store.dto.AddressDto;
import com.urbanaisle.store.entities.Address;
import com.urbanaisle.store.entities.Product;
import com.urbanaisle.store.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/address")
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody AddressDto addressDto, Principal principal){

        Address address = addressService.createAddress(addressDto,principal);

        return new ResponseEntity<>(address,HttpStatus.OK);
    }

}
