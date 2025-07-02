package com.ai_powered.app.user_service.config.security;

import com.ai_powered.app.user_service.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticationService implements UserDetailsService {

    private final UserRepository repository;

    public AutenticationService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return repository.findByUsername(userName)
                .map(user -> (UserDetails) user)
                .orElseThrow(() -> new UsernameNotFoundException("No se encontro un user con el userName: " + userName));
    }
}