package com.urbanaisle.store.controllers;

import com.urbanaisle.store.dto.CategoryDto;
import com.urbanaisle.store.entities.Category;
import com.urbanaisle.store.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id", required = true) UUID categoryId){

        Category category = categoryService.getCategory(categoryId);

        return  new ResponseEntity<>(category, HttpStatus.OK);

    }

    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategoryById(){

        List<Category> category = categoryService.getAllCategories();

        return new ResponseEntity<>(category, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDto categoryDto){

        Category category= categoryService.createCategory(categoryDto);

        return new ResponseEntity<>(category, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody CategoryDto categoryDto, @PathVariable (value = "id", required = true) UUID categoryId){

        Category category = categoryService.updateTheCategory(categoryDto, categoryId);

        return new ResponseEntity<>(category, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable (value = "id", required = true) UUID categoryId){

        categoryService.deleteTheCategory(categoryId);

        return ResponseEntity.ok().build();
    }

}
