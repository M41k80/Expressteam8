package com.ai_powered.app.user_service.error;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String identifier) {
        super("Usuario no encontrado: " + identifier);
    }
}