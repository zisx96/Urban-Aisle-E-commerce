package com.urbanaisle.store.services;

import java.util.List;

import com.urbanaisle.store.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbanaisle.store.entities.Product;
import com.urbanaisle.store.repositories.ProductRepository;

@Service
public class ProductService implements IProductService {
	
	private ProductRepository prodRepo;
	
	@Autowired
	public void setProductRepository(ProductRepository prodRepo) {
		
		this.prodRepo = prodRepo;
	}
	
	@Override
	public Product addProduct(Product product) {
		
		
		return null;
	}

	@Override
	public List<Product> getAllProducts() {

		List<Product> products = prodRepo.findAll();

// 		to-do mapping of product into product dto
		
		return products;
	}

	private Product createProduct(ProductDto productDto) {

		Product product = new Product();
		product.setName(productDto.getName());
		product.setDescription(productDto.getDescription());
		product.setBrand(productDto.getBrand());
		product.setNewArrival(productDto.getIsNewArrival());
		product.setPrice(productDto.getPrice());

		return  product;
	}

}
