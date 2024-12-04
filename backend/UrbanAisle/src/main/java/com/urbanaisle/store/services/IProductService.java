package com.urbanaisle.store.services;

import java.util.List;

import com.urbanaisle.store.entities.Product;

public interface IProductService {
	
	public Product addProduct(Product product);
	public List<Product> getAllProducts();
	
}
