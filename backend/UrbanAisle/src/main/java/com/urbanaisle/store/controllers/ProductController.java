package com.urbanaisle.store.controllers;

import com.urbanaisle.store.dto.ProductDto;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public List<ProductDto> getAllProducts(){
        return Collections.EMPTY_LIST;
    }

    // Create ProductDto
    @PostMapping("")
    public ProductDto createProduct(@RequestBody ProductDto productDto){
        return null;
    }

}
