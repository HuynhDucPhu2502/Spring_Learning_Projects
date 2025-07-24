package me.huynhducphu.talent_bridge.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.subscriber.DefaultSubscriberRequestDto;
import me.huynhducphu.talent_bridge.dto.response.subscriber.DefaultSubscriberResponseDto;
import me.huynhducphu.talent_bridge.service.SubscriberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 7/24/2025
 **/
@Tag(name = "Subscriber")
@RestController
@RequestMapping("/subscribers")
@RequiredArgsConstructor
public class SubscriberController {

    private final SubscriberService subscriberService;

    @PostMapping("/me")
    @ApiMessage(value = "Tạo subscriber cho người dùng hiện tại")
    @PreAuthorize("hasAuthority('POST /subscribers/me')")
    @Operation(
            summary = "Tạo subscriber cho người dùng hiện tại",
            description = "Yêu cầu quyền: <b>POST /subscribers/me</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultSubscriberResponseDto> saveSelfSubscriber(
            @Valid @RequestBody DefaultSubscriberRequestDto defaultSubscriberRequestDto
    ) {
        return ResponseEntity.ok(subscriberService.saveSelfSubscriber(defaultSubscriberRequestDto));
    }

    @GetMapping("/me")
    @ApiMessage(value = "Lấy subscriber cho người dùng hiện tại")
    @PreAuthorize("hasAuthority('GET /subscribers/me')")
    @Operation(
            summary = "Lấy subscriber cho người dùng hiện tại",
            description = "Yêu cầu quyền: <b>GET /subscribers/me</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultSubscriberResponseDto> findSelfSubscriber() {
        return ResponseEntity.ok(subscriberService.findSelfSubscriber());
    }

    @PutMapping("/me")
    @ApiMessage(value = "Cập nhật subscriber cho người dùng hiện tại")
    @PreAuthorize("hasAuthority('PUT /subscribers/me')")
    @Operation(
            summary = "Cập nhật subscriber cho người dùng hiện tại",
            description = "Yêu cầu quyền: <b>PUT /subscribers/me</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultSubscriberResponseDto> updateSelfSubscriber(
            @Valid @RequestBody DefaultSubscriberRequestDto defaultSubscriberRequestDto
    ) {
        return ResponseEntity.ok(subscriberService.updateSelfSubscriber(defaultSubscriberRequestDto));
    }

    @DeleteMapping("/me")
    @ApiMessage(value = "Xóa subscriber cho người dùng hiện tại")
    @PreAuthorize("hasAuthority('DELETE /subscribers/me')")
    @Operation(
            summary = "Xóa subscriber cho người dùng hiện tại",
            description = "Yêu cầu quyền: <b>DELETE /subscribers/me</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<Void> deleteSelfSubscriber() {
        subscriberService.deleteSelfSubscriber();
        return ResponseEntity.noContent().build();
    }

}
