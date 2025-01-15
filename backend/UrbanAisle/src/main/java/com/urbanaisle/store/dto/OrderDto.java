package com.urbanaisle.store.dto;

import com.urbanaisle.store.entities.OrderItem;
import com.urbanaisle.store.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {

    private UUID userId;
    private Date orderDate;
    private UUID addressId;
    private List<OrderItemDto> OrderItemRequests;
    private Double totalAmount;
    private Double discount;
    private String paymentMethod;
    private Date expectedDeliveryDate;

}
