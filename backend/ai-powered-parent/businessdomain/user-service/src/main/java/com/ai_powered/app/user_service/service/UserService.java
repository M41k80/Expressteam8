package com.ai_powered.app.user_service.service;

import com.ai_powered.app.user_service.dto.*;

import java.util.List;

public interface UserService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(LoginRequest request);

    UserResponse getById(Long id);

    UserResponse updateUser(Long id, UpdateUserRequest dto);

    void deleteUser(Long id);

    List<UserResponse> listAll();
}
