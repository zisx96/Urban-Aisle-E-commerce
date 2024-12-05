package com.urbanaisle.store.controllers;

import com.urbanaisle.store.entities.Product;
import com.urbanaisle.store.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public void setProductService(ProductService productService){

        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){

        List<Product> productList = productService.getAllProducts();

        return new ResponseEntity<>(productList, HttpStatus.OK);

    }

    // Create ProductDto
    @PostMapping("")
    public ResponseEntity<Product> createProduct(@RequestBody Product productDto){
        Product product = productService.addProduct(productDto);

        return  new ResponseEntity<>(product, HttpStatus.CREATED);

    }

}
