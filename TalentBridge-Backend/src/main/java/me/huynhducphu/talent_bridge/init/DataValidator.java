package me.huynhducphu.talent_bridge.init;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Admin 7/20/2025
 **/
@Component
@RequiredArgsConstructor
public class DataValidator implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        checkRoleTable();
    }

    private void checkRoleTable() {
        if (!roleRepository.existsByName("ADMIN") || !roleRepository.existsByName("USER"))
            throw new IllegalStateException("Dữ liệu bảng Role không hợp lệ");
    }
}
