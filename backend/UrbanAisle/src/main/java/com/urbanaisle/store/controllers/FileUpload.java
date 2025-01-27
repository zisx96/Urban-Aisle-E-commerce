package com.urbanaisle.store.controllers;

import com.urbanaisle.store.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@CrossOrigin
public class FileUpload {

    @Autowired
    FileUploadService service;

    @PostMapping
    public ResponseEntity<?> uploadingFile(@RequestParam(value = "file",required = true) MultipartFile file, @RequestParam(value = "fileName", required = true) String fileName){

        int statusCode = service.uploadFile(file,fileName);

        return new ResponseEntity<>(statusCode == 201 ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
