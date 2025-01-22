package com.urbanaisle.store.controllers;

import com.stripe.model.PaymentIntent;
import com.urbanaisle.store.auth.dto.OrderResponse;
import com.urbanaisle.store.auth.services.PaymentIntentService;
import com.urbanaisle.store.dto.OrderDto;
import com.urbanaisle.store.entities.Order;
import com.urbanaisle.store.entities.Payment;
import com.urbanaisle.store.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentIntentService paymentIntentService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto, Principal principal) throws Exception {

        OrderResponse orderResponse = orderService.createOrder(orderDto,principal);

        return new ResponseEntity<>(orderResponse,HttpStatus.OK);
    }

}
