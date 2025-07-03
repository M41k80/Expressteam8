package com.ai_powered.app.user_service.config.security;

import com.ai_powered.app.user_service.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;

@Service
public class TokenService {

    /**
     * Secret en Base64 (p. ej. "skvkzhRfmnbXVWNJQ5/IlXamh4k6z8m3uCa9qYLYMOM=")
     */
    @Value("${jwt.secret}")
    private String jwtSecretBase64;

    private Algorithm hmac256;

    @PostConstruct
    public void init() {
        // 1. Decodificamos la Base64 para obtener los bytes reales (de 32 bytes mínimo)
        byte[] secretBytes = Base64.getDecoder().decode(jwtSecretBase64);
        System.out.println(secretBytes.length); // debe imprimir 32

        // 2. Creamos el Algorithm HMAC256 a partir de esos bytes
        this.hmac256 = Algorithm.HMAC256(secretBytes);
    }

    public String generateToken(User user) {
        try {
            return JWT.create()
                    .withIssuer("ai-powered")
                    .withSubject(user.getUsername())
                    .withClaim("id", user.getId())
                    .withClaim("type", "ACCESS")
                    .withClaim("role", user.getRole())
                    .withExpiresAt(generateFechaExpiracion())
                    .sign(hmac256);
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el token", e);
        }
    }

    public String getSubject(String token) {
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("El token es nulo o vacío");
        }
        try {
            DecodedJWT jwt = JWT.require(hmac256)
                    .withIssuer("ai-powered")
                    .build()
                    .verify(token);
            return jwt.getSubject();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Token inválido o expirado", e);
        }
    }

    public String getTokenType(String token) {
        try {
            DecodedJWT jwt = JWT.require(hmac256)
                    .withIssuer("ai-powered")
                    .build()
                    .verify(token);
            return jwt.getClaim("type").asString();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Error al obtener el tipo de token", e);
        }
    }

    private Instant generateFechaExpiracion() {
        return LocalDateTime.now()
                .plusHours(2)
                .toInstant(ZoneOffset.of("-03:00"));
    }
}
