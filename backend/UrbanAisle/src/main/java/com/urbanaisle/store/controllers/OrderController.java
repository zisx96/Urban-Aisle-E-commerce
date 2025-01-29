package com.urbanaisle.store.controllers;

import com.stripe.model.PaymentIntent;
import com.urbanaisle.store.auth.dto.OrderResponse;
import com.urbanaisle.store.auth.services.PaymentIntentService;
import com.urbanaisle.store.dto.OrderDetails;
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
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentIntentService paymentIntentService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto, Principal principal) throws Exception {

        OrderResponse orderResponse = orderService.createOrder(orderDto,principal);

        return new ResponseEntity<>(orderResponse,HttpStatus.OK);
    }

    @PostMapping("/update-payment")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody Map<String,String> request){
        Map<String,String> response = orderService.updateStatus(request.get("paymentIntent"),request.get("status"));

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable UUID id, Principal principal){

        orderService.cancelOrder(id, principal);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderDetails>> getOrdersByUser(Principal principal){

        List<OrderDetails> order = orderService.getOrderByUser(principal.getName());

        return new ResponseEntity<>(order,HttpStatus.OK);

    }

}
