package com.urbanaisle.store.mapper;

import com.urbanaisle.store.dto.ProductDto;
import com.urbanaisle.store.dto.ProductResourceDto;
import com.urbanaisle.store.dto.ProductVariantDto;
import com.urbanaisle.store.entities.*;
import com.urbanaisle.store.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    @Autowired
    private CategoryService categoryService;

    public Product mapToProduct(ProductDto productDto) {

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

        return  product;
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

    public List<ProductDto> getProductDtos(List<Product> products) {

        return products.stream()
                .map(this::mapProductToDto).toList();

    }

    private ProductDto mapProductToDto(Product product) {

        return ProductDto.builder()
                .id(product.getID())
                .brand(product.getBrand())
                .name(product.getName())
                .price(product.getPrice())
                .isNewArrival(product.isNewArrival())
                .rating(product.getRating())
                .description(product.getDescription())
                .thumbnail(getProductThumbnail(product.getResources())).build();
    }

    private String getProductThumbnail(List<Resources> resources){

        return resources.stream().filter(Resources::getIsPrimary)
                .findFirst().orElse(null).getUrl();
    }
}
