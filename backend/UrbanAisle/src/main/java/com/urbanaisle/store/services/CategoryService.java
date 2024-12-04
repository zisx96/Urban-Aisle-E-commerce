package com.urbanaisle.store.services;

import com.urbanaisle.store.dto.CategoryDto;
import com.urbanaisle.store.dto.CategoryTypeDto;
import com.urbanaisle.store.entities.Category;
import com.urbanaisle.store.entities.CategoryType;
import com.urbanaisle.store.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category getCategory(UUID categoryId){
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category.orElse(null);
    }

    public Category createCategory(CategoryDto categoryDto){

        Category category = mapToEntity(categoryDto);
        return  categoryRepository.save(category);

    }

    private Category mapToEntity(CategoryDto categoryDto){

        Category category = new Category();

        category.setName(categoryDto.getName());
        category.setCode(categoryDto.getCode());
        category.setDescription(categoryDto.getDescription());
        category.setCategoryTypes(mapToCategoryTypes(categoryDto.getCategoryTypeList()));

        return category;
    }

    private List<CategoryType> mapToCategoryTypes(List<CategoryTypeDto> categoryTypeList) {
       return categoryTypeList.stream().map(categoryTypeDto -> {
           CategoryType categoryType = new CategoryType();
           categoryType.setCode(categoryTypeDto.getCode());
           categoryType.setName(categoryTypeDto.getName());
           categoryType.setDescription(categoryTypeDto.getDescription());
           return categoryType;
       }).collect(Collectors.toList());
    }
}
