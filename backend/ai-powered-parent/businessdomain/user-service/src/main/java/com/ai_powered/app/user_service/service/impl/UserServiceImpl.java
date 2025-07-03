package com.ai_powered.app.user_service.service.impl;

import com.ai_powered.app.user_service.config.security.TokenService;
import com.ai_powered.app.user_service.dto.AuthenticationResponse;
import com.ai_powered.app.user_service.dto.LoginRequest;
import com.ai_powered.app.user_service.dto.RegisterRequest;
import com.ai_powered.app.user_service.dto.UpdateUserRequest;
import com.ai_powered.app.user_service.dto.UserResponse;
import com.ai_powered.app.user_service.error.UserAlreadyExistsException;
import com.ai_powered.app.user_service.error.UserNotFoundException;
import com.ai_powered.app.user_service.model.User;
import com.ai_powered.app.user_service.repository.UserRepository;
import com.ai_powered.app.user_service.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
            throw new UserAlreadyExistsException(req.username());
        }
        String role = (req.role() != null) ? req.role() : "ROLE_USER";
        User user = User.builder()
                .username(req.username())
                .password(passwordEncoder.encode(req.password()))
                .role(role)
                .build();
        userRepository.save(user);

        String token = tokenService.generateToken(user);
        return new AuthenticationResponse(token);
    }

    @Override
    public AuthenticationResponse authenticate(LoginRequest req) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.username(), req.password()));
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Usuario o contraseña incorrectos");
        }
        User user = userRepository.findByUsername(req.username())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        String token = tokenService.generateToken(user);
        return new AuthenticationResponse(token);
    }

    @Override
    public UserResponse getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuario con id=" + id + " no encontrado"));
        return toDTO(user);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UpdateUserRequest dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuario con id=" + id + " no encontrado"));

        if (dto.username() != null && !dto.username().equals(user.getUsername())) {
            if (userRepository.existsByUsername(dto.username())) {
                throw new UserAlreadyExistsException(dto.username());
            }
            user.setUsername(dto.username());
        }
        if (dto.role() != null) {
            user.setRole(dto.role());
        }
        User updated = userRepository.save(user);
        return toDTO(updated);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("Usuario con id=" + id + " no encontrado");
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<UserResponse> listAll() {
        return userRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private UserResponse toDTO(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
