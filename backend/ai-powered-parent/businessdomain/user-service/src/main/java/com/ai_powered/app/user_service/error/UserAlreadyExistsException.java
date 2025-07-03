package com.ai_powered.app.user_service.error;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String username) {
        super("El nombre de usuario '" + username + "' ya existe");
    }
}