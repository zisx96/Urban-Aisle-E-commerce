package com.urbanaisle.store.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {

    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;


}
