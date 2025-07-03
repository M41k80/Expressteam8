package com.ai_powered.app.user_service.dto;

import java.time.LocalDateTime;

public record ErrorResponse(
        String code,
        String message,
        String detail,
        LocalDateTime timestamp
) {
}
