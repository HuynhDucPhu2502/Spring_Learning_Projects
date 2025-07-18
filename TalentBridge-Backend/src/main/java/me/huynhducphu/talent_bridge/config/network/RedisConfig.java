package me.huynhducphu.talent_bridge.config.network;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

/**
 * Admin 7/4/2025
 **/
@Configuration
public class RedisConfig {

    @Value("${redis.host}")
    private String redisHost;

    @Value("${redis.port}")
    private int redisPort;

    @Value("${redis.password}")
    private String redisPassword;

    // =====================================================================
    // 1. Kết nối tới Redis
    //    - Định nghĩa RedisConnectionFactory với host, port, password
    //    - Bean này dùng chung cho RedisTemplate & Spring Cache
    // =====================================================================
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration serverConfig =
                new RedisStandaloneConfiguration(redisHost, redisPort);

        if (!redisPassword.isBlank()) {
            serverConfig.setPassword(RedisPassword.of(redisPassword));
        }

        return new LettuceConnectionFactory(serverConfig);
    }


    // =====================================================================
    // 2. Đăng ký RedisTemplate: Cho phép thao tác key-value trực tiếp với Redis
    // =====================================================================
    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        template.setKeySerializer(stringRedisSerializer);
        template.setValueSerializer(stringRedisSerializer);
        template.setHashKeySerializer(stringRedisSerializer);
        template.setHashValueSerializer(stringRedisSerializer);

        return template;
    }

    // =====================================================================
    // 3. Cấu hình Spring Cache với Redis
    //    - Thiết lập thời gian sống mặc định cho cache (TTL)
    //    - Chỉ áp dụng cho các cache dùng annotation (@Cacheable, @CacheEvict...)
    // =====================================================================
    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(15))
                .disableCachingNullValues();
    }

    // =====================================================================
    // 4. Khởi tạo CacheManager sử dụng Redis
    //    - Quản lý cache thông qua Spring Cache (annotation)
    //    - Tự động áp dụng các cấu hình phía trên cho toàn bộ cache
    // =====================================================================
    @Bean
    public RedisCacheManager cacheManager(
            RedisConnectionFactory factory,
            RedisCacheConfiguration cacheConfiguration) {
        return RedisCacheManager.builder(factory)
                .cacheDefaults(cacheConfiguration)
                .transactionAware()
                .build();
    }
}
