package com.urbanaisle.store.controllers;

import com.urbanaisle.store.dto.ProductDto;
import com.urbanaisle.store.entities.Product;
import com.urbanaisle.store.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) UUID categoryId, @RequestParam(required = false) UUID typeId ){

        List<Product> productList = productService.getAllProducts(categoryId, typeId);

        return new ResponseEntity<>(productList, HttpStatus.OK);

    }

    // Create ProductDto
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto){
        Product product = productService.addProduct(productDto);

        return  new ResponseEntity<>(product, HttpStatus.CREATED);

    }

}
