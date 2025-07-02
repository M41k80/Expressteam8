package com.ai_powered.app.user_service.controller;

import com.ai_powered.app.user_service.dto.UpdateUserRequest;
import com.ai_powered.app.user_service.model.User;
import com.ai_powered.app.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Listar todos los usuarios (solo ADMIN)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> listAll() {
        List<User> users = userService.listAll();
        return ResponseEntity.ok(users);
    }

    /**
     * Obtener un usuario por ID (USER y ADMIN pueden ver su propio perfil; ADMIN puede ver cualquiera)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('USER') and #id == principal.id)")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Actualizar datos de un usuario (solo ADMIN o el mismo USER)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('USER') and #id == principal.id)")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest dto
    ) {
        User updated = userService.updateUser(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Eliminar un usuario (solo ADMIN)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
