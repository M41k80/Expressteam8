package com.ai_powered.app.user_service.controller;

import com.ai_powered.app.user_service.dto.LoginRequest;
import com.ai_powered.app.user_service.dto.RegisterRequest;
import com.ai_powered.app.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequest datos) {
        var authResponse = userService.authenticate(datos);
        return ResponseEntity.ok(new LoginResponseDTO(authResponse.token()));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequest datos) {
        var authResponse = userService.register(datos);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new RegisterResponseDTO(authResponse.token()));
    }

    public record LoginResponseDTO(String accessToken) {
    }

    public record RegisterResponseDTO(String accessToken) {
    }
}
