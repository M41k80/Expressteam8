package com.ai_powered.app.user_service.dto;

import java.time.LocalDateTime;

public record UserResponse(Long id,
                           String username,
                           String role,
                           LocalDateTime createdAt,
                           LocalDateTime updatedAt) {
}
