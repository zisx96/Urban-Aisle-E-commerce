package com.urbanaisle.store.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbanaisle.store.entities.Product;
import com.urbanaisle.store.repositories.ProductRepository;

@Service
public class ProductService implements IProductService {
	
	private ProductRepository repo;
	
	@Autowired
	public void setProductRepository(ProductRepository repo) {
		
		this.repo = repo;
	}
	
	@Override
	public Product addProduct(Product product) {
		
		
		return null;
	}

	@Override
	public List<Product> getAllProducts() {
		
		List<Product> product = repo.findAll();

// 		to-do mapping of product into product dto
		
		return product;
	}

}
