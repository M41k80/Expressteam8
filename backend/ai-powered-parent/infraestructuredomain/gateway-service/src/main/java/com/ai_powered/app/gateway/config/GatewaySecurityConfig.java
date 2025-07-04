package com.ai_powered.app.gateway.config;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

import java.util.Base64;

@Configuration
@EnableWebFluxSecurity
public class GatewaySecurityConfig {

    @Value("${jwt.secret}")
    private String jwtSecretBase64;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        // 1) Mostramos la cadena Base64 que lee realmente el bean
        System.out.println("🔐 jwt.secret raw: [" + jwtSecretBase64 + "]");
        // 2) Decodificamos y comprobamos la longitud en bytes
        byte[] secretBytes = Base64.getDecoder().decode(jwtSecretBase64);
        System.out.println("🔐 secretBytes.length = " + secretBytes.length);
        // 3) Creamos la clave HMAC
        this.secretKey = new SecretKeySpec(secretBytes, "HmacSHA256");
    }

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        // Ya tenemos secretKey inicializado en init()
        return NimbusReactiveJwtDecoder.withSecretKey(secretKey).build();
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/auth/**").permitAll()
                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtDecoder(jwtDecoder()))
                );
        return http.build();
    }

}
