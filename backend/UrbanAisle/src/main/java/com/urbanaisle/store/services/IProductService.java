package com.urbanaisle.store.services;

import java.util.List;
import java.util.UUID;

import com.urbanaisle.store.dto.ProductDto;
import com.urbanaisle.store.entities.Product;

public interface IProductService {
	
	public Product addProduct(ProductDto productDto);
	public List<Product> getAllProducts(UUID categoryId, UUID typeId);

}
