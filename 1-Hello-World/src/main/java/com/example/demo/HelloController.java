package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin 5/30/2025
 **/
@RestController
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "hello world hi";
    }

}
