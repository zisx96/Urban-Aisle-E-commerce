package com.urbanaisle.store.controllers;

import ch.qos.logback.core.util.StringUtil;
import com.urbanaisle.store.dto.ProductDto;
import com.urbanaisle.store.entities.Product;
import com.urbanaisle.store.services.ProductService;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(@RequestParam(required = false) UUID categoryId, @RequestParam(required = false) UUID typeId, @RequestParam(required = false) String slug ){
        List<ProductDto> productList = new ArrayList<>();
        if(StringUtils.isNotBlank(slug)){
            ProductDto productDto = productService.getProductBySlug(slug);
            productList.add(productDto);
        }
        else{
            productList = productService.getAllProducts(categoryId, typeId);
        }

        return new ResponseEntity<>(productList, HttpStatus.OK);

    }

    // Create ProductDto
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto){
        Product product = productService.addProduct(productDto);

        return  new ResponseEntity<>(product, HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable UUID id){

        ProductDto productDto = productService.getProductById(id);

        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Product> updateTheProduct(@RequestBody ProductDto productDto){

        Product product = productService.updateProduct(productDto);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

}
