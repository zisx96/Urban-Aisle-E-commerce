package com.urbanaisle.store.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI(){

        return  new OpenAPI().info(new Info().title("Shopin UrbanAisle API's").description("UrbanAisle E-commerce Application")
                .version("1.0")
                .contact(new Contact()
                        .name("The Shopin")));
    }

}
