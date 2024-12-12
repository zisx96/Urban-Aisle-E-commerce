package com.urbanaisle.store.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.urbanaisle.store.dto.ProductDto;
import com.urbanaisle.store.dto.ProductResourceDto;
import com.urbanaisle.store.dto.ProductVariantDto;
import com.urbanaisle.store.entities.*;
import com.urbanaisle.store.mapper.ProductMapper;
import com.urbanaisle.store.specification.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.urbanaisle.store.repositories.ProductRepository;

@Service
public class ProductService implements IProductService {

	@Autowired
	private ProductRepository prodRepo;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ProductMapper productMapper;

	@Override
	public Product addProduct(ProductDto productDto) {

		Product product = productMapper.mapToProduct(productDto);

		return prodRepo.save(product);
	}

	@Override
	public List<ProductDto> getAllProducts(UUID categoryId, UUID typeId) {

		Specification<Product> productSpecification = Specification.where(null);
		if(null != categoryId){

			productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
		}

		if(null != typeId){

			productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
		}
		List<Product> products = prodRepo.findAll(productSpecification);

		return productMapper.getProductDtos(products);
	}


}
