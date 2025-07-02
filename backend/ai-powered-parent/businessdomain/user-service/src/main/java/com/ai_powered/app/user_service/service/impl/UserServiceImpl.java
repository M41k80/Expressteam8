package com.ai_powered.app.user_service.service.impl;

import com.ai_powered.app.user_service.config.security.TokenService;
import com.ai_powered.app.user_service.dto.*;
import com.ai_powered.app.user_service.model.User;
import com.ai_powered.app.user_service.repository.UserRepository;
import com.ai_powered.app.user_service.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthenticationResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.username())) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }
        User user = User.builder()
                .username(req.username())
                .password(passwordEncoder.encode(req.password()))
                .role("ROLE_USER")
                .build();
        userRepository.save(user);

        String token = tokenService.generateToken(user);
        return new AuthenticationResponse(token);
    }

    @Override
    public AuthenticationResponse authenticate(LoginRequest req) {
        var authToken = new UsernamePasswordAuthenticationToken(
                req.username(), req.password());
        authenticationManager.authenticate(authToken);

        User user = userRepository.findByUsername(req.username())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        String token = tokenService.generateToken(user);
        return new AuthenticationResponse(token);
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    @Override
    @Transactional
    public User updateUser(Long id, UpdateUserRequest dto) {
        User user = getById(id);

        if (dto.username() != null && !dto.username().equals(user.getUsername())) {
            if (userRepository.existsByUsername(dto.username())) {
                throw new IllegalArgumentException("El nombre de usuario ya existe");
            }
            user.setUsername(dto.username());
        }
        if (dto.role() != null) {
            user.setRole(dto.role());
        }
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<User> listAll() {
        return userRepository.findAll();
    }
}
