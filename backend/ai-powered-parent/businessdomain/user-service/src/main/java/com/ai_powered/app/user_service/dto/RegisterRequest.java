package com.ai_powered.app.user_service.dto;

public record RegisterRequest(
        String username,
        String password,
        String role
) {}
