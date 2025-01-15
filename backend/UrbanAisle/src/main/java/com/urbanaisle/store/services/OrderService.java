package com.urbanaisle.store.services;

import com.urbanaisle.store.auth.entities.User;
import com.urbanaisle.store.dto.OrderDto;
import com.urbanaisle.store.dto.OrderItemDto;
import com.urbanaisle.store.entities.*;
import com.urbanaisle.store.repositories.OrderRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Transactional
    public Order createOrder(OrderDto orderDto, Principal principal) throws Exception {

        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        Address address = user.getAddressList().stream().filter((address1) ->
                orderDto.getAddressId().equals(address1.getId())).findFirst().orElseThrow(BadRequestException::new);

        Order order = Order.builder()
                .user(user)
                .address(address)
                .totalAmount(orderDto.getTotalAmount())
                .orderDate(orderDto.getOrderDate())
                .discount(orderDto.getDiscount())
                .expectedDelivery(orderDto.getExpectedDeliveryDate())
                .paymentMethod(orderDto.getPaymentMethod())
                .orderStatus(OrderStatus.PENDING)
                .build();

        List<OrderItem> orderItems = orderDto.getOrderItemRequests().stream().map(orderItemRequest -> {
            try {
                Product product = productService.fetchProductById(orderItemRequest.getProductId());
                OrderItem orderItem = OrderItem.builder()
                        .product(product)
                        .productVariantId(orderItemRequest.getProductVariantId())
                        .quantity(orderItemRequest.getQuantity())
                        .order(order)
                        .build();
                return orderItem;

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();

        order.setOrderItemList(orderItems);
        Payment payment = new Payment();
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setPaymentDate(new Date());
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod("");
        order.setPayment(payment);

        return orderRepository.save(order);

    }

}
