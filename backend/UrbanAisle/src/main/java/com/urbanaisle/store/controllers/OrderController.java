package com.urbanaisle.store.controllers;

import com.urbanaisle.store.dto.OrderDto;
import com.urbanaisle.store.entities.Order;
import com.urbanaisle.store.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto orderDto, Principal principal) throws Exception {

        Order order = orderService.createOrder(orderDto, principal);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

}
