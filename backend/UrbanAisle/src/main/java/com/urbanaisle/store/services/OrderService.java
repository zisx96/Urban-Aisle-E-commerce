package com.urbanaisle.store.services;

import com.stripe.model.PaymentIntent;
import com.urbanaisle.store.auth.dto.OrderResponse;
import com.urbanaisle.store.auth.entities.User;
import com.urbanaisle.store.auth.services.PaymentIntentService;
import com.urbanaisle.store.dto.OrderDetails;
import com.urbanaisle.store.dto.OrderDto;
import com.urbanaisle.store.dto.OrderItemDetails;
import com.urbanaisle.store.dto.OrderItemDto;
import com.urbanaisle.store.entities.*;
import com.urbanaisle.store.repositories.OrderRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;

@Service
public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private PaymentIntentService paymentIntentService;

    @Transactional
    public OrderResponse createOrder(OrderDto orderDto, Principal principal) throws Exception {

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
        payment.setPaymentMethod(order.getPaymentMethod());
        order.setPayment(payment);
        Order saveOrder = orderRepository.save(order);

        OrderResponse orderResponse = OrderResponse.builder()
                .paymentMethod(orderDto.getPaymentMethod())
                .orderId(saveOrder.getId())
                .build();

        if(Objects.equals(orderDto.getPaymentMethod(), "CARD")){
            orderResponse.setCredentials(paymentIntentService.createPaymentIntent(order));
        }

        return orderResponse;

    }

    public Map<String,String> updateStatus(String paymentIntentId, String status) {

        try{
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            if(paymentIntent != null && paymentIntent.getStatus().equals("succeeded")){
                String orderId = paymentIntent.getMetadata().get("orderId");
                Order order = orderRepository.findById(UUID.fromString(orderId)).orElseThrow(BadRequestException::new);
                Payment payment = order.getPayment();
                payment.setPaymentStatus(PaymentStatus.COMPLETED);
                payment.setPaymentMethod(paymentIntent.getPaymentMethod());
                order.setPaymentMethod(paymentIntent.getPaymentMethod());
                order.setOrderStatus(OrderStatus.IN_PROGRESS);
                order.setPayment(payment);
                Order savedOrder = orderRepository.save(order);
                Map<String,String> map = new HashMap<>();
                map.put("orderId",String.valueOf(savedOrder.getId()));
                return map;
            }
            else {

                throw new IllegalArgumentException("Payment not found or missing metadata");
            }
        }catch (Exception e){

            throw new IllegalArgumentException("Payment not found or missing metadata");
        }

    }

    public List<OrderDetails> getOrderByUser(String name) {

        User user = (User) userDetailsService.loadUserByUsername(name);
        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream().map(order -> {
            return OrderDetails.builder()
                    .id(order.getId())
                    .orderDate(order.getOrderDate())
                    .orderStatus(order.getOrderStatus())
                    .shipmentNumber(order.getShipmentTrackingNumber())
                    .address(order.getAddress())
                    .totalAmount(order.getTotalAmount())
                    .orderItemDetailsList(getItemDetails(order.getOrderItemList()))
                    .expectedDeliveryDate(order.getExpectedDelivery())
                    .build();
        }).toList();

    }

    private List<OrderItemDetails> getItemDetails(List<OrderItem> orderItemList) {

        return orderItemList.stream().map(orderItem -> {
            return OrderItemDetails.builder()
                    .id(orderItem.getId())
                    .itemPrice(orderItem.getItemPrice())
                    .product(orderItem.getProduct())
                    .productVariantId(orderItem.getProductVariantId())
                    .quantity(orderItem.getQuantity())
                    .build();
        }).toList();
    }

    public void cancelOrder(UUID id, Principal principal) {

        User user = (User) userDetailsService.loadUserByUsername(principal.getName());
        Order order = orderRepository.findById(id).get();
        if(null != order && order.getUser().getId().equals(user.getId())){

            order.setOrderStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
        }
        else {

            new RuntimeException("Invalid Request");
        }
    }
}
