package com.ai_powered.app.user_service.error;

import org.springframework.http.converter.HttpMessageNotReadableException;

public class BadRequestBodyException extends HttpMessageNotReadableException {
    public BadRequestBodyException(String msg) {
        super(msg);
    }
}