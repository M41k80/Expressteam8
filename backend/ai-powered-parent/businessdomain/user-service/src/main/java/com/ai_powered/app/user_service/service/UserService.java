package com.ai_powered.app.user_service.service;

import com.ai_powered.app.user_service.dto.*;
import com.ai_powered.app.user_service.model.User;

import java.util.List;

public interface UserService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(LoginRequest request);

    User getById(Long id);

    User updateUser(Long id, UpdateUserRequest dto);

    void deleteUser(Long id);

    List<User> listAll();
}
