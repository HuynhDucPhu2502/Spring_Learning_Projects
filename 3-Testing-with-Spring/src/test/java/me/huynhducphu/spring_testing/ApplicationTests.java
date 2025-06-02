package me.huynhducphu.spring_testing;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class ApplicationTests {

    @Value("${spring.application.name}")
    private String title;

    @Test
    void contextLoads() {
        System.out.println("profile: " + title);
    }

}
