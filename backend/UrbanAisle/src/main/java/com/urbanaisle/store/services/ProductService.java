package com.urbanaisle.store.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.urbanaisle.store.dto.ProductDto;
import com.urbanaisle.store.dto.ProductResourceDto;
import com.urbanaisle.store.dto.ProductVariantDto;
import com.urbanaisle.store.entities.*;
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

	@Override
	public Product addProduct(ProductDto productDto) {

		Product product = mapToProduct(productDto);

		return prodRepo.save(product);
	}

	@Override
	public List<Product> getAllProducts(UUID categoryId, UUID typeId) {

		Specification<Product> productSpecification = Specification.where(null);
		if(null != categoryId){

			productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
		}

		if(null != typeId){

			productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
		}
		return prodRepo.findAll(productSpecification);

// 		to-do mapping of product into product dto
	}

	private Product mapToProduct(ProductDto productDto) {

		Product product = new Product();
		product.setName(productDto.getName());
		product.setDescription(productDto.getDescription());
		product.setBrand(productDto.getBrand());
		product.setNewArrival(productDto.getIsNewArrival());
		product.setPrice(productDto.getPrice());
		product.setRating(productDto.getRating());

		Category category = categoryService.getCategory(productDto.getCategoryId());
		if(null != category){

			product.setCategory(category);
			UUID categoryTypeId = productDto.getCategoryTypeId();

			CategoryType categoryType = category.getCategoryTypes().stream()
							.filter(categoryType1 -> categoryType1.getId()
							.equals(categoryTypeId))
							.findFirst().orElse(null);

			product.setCategoryType(categoryType);
		}

		if(null != productDto.getVariants()){

			product.setProductVariant(mapToProductVariant(productDto.getVariants(),product));
		}

		if(null != productDto.getProductResources()){

			product.setResources(mapToProductResources(productDto.getProductResources(),product));
		}

		return  prodRepo.save(product);
	}

	private List<Resources> mapToProductResources(List<ProductResourceDto> productResources, Product product) {

		return productResources.stream().map(productResourceDto -> {
			Resources resources = new Resources();
			resources.setName(productResourceDto.getName());
			resources.setType(productResourceDto.getType());
			resources.setUrl(productResourceDto.getUrl());
			resources.setIsPrimary(productResourceDto.getIsPrimary());
			resources.setProduct(product);
			return resources;
		}).collect(Collectors.toList());
	}

	private List<ProductVariant> mapToProductVariant(List<ProductVariantDto> productVariantDtos, Product product){

		return  productVariantDtos.stream().map(productVariantDto -> {
			ProductVariant productVariant = new ProductVariant();
			productVariant.setColor(productVariantDto.getColor());
			productVariant.setSize(productVariantDto.getSize());
			productVariant.setStockQuantity(productVariantDto.getStockQuantity());
			productVariant.setProduct(product);
			return productVariant;

		}).collect(Collectors.toList());
	}

}
