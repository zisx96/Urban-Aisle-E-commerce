package com.urbanaisle.store.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.urbanaisle.store.dto.ProductDto;
import com.urbanaisle.store.entities.*;
import com.urbanaisle.store.exceptions.ResourceNotFoundException;
import com.urbanaisle.store.mapper.ProductMapper;
import com.urbanaisle.store.specification.ProductSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.urbanaisle.store.repositories.ProductRepository;

import javax.crypto.BadPaddingException;

@Slf4j
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

	@Override
	public ProductDto getProductBySlug(String slug) {
		Product product = prodRepo.findBySlug(slug);
		if(null == product){
			throw new ResourceNotFoundException("Product Not Found");
		}
		ProductDto productDto = productMapper.mapProductToDto(product);
		productDto.setCategoryId(product.getCategory().getId());
		productDto.setCategoryTypeId(product.getCategoryType().getId());
		productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariant()));
		productDto.setProductResources(productMapper.mapProductResourcesListDto(product.getResources()));
		return productDto;
	}

	@Override
	public ProductDto getProductById(UUID id) {

		Product product = prodRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Product Not Found"));
		ProductDto productDto = productMapper.mapProductToDto(product);
		productDto.setCategoryId(product.getCategory().getId());
		productDto.setCategoryTypeId(product.getCategoryType().getId());
		productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariant()));
		productDto.setProductResources(productMapper.mapProductResourcesListDto(product.getResources()));

		return productDto;

	}

	@Override
	public Product updateProduct(ProductDto productDto) {
		Product product = prodRepo.findById(productDto.getId())
				.orElseThrow(()-> new ResourceNotFoundException("Product not Found"));

		return prodRepo.save(productMapper.mapToProduct(productDto));
	}

	@Override
	public Product fetchProductById(UUID id) throws Exception {

		return prodRepo.findById(id).orElseThrow(BadPaddingException::new);
	}

}
