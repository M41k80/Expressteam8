package com.ai_powered.app.user_service.config.security;

import com.ai_powered.app.user_service.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("ai-powered")
                    .withSubject(user.getUsername())
                    .withClaim("id", user.getId())
                    .withClaim("type", "ACCESS")
                    .withClaim("role", user.getRole())
                    .withExpiresAt(generateFechaExpiracion())
                    .sign(algorithm);
        } catch (Exception e) {
            throw new RuntimeException("Error al generate el token", e);
        }
    }

    public String getSubject(String token) {
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("El token es nulo o vacio");
        }
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT verifier = JWT.require(algorithm)
                    .withIssuer("ai-powered")
                    .build()
                    .verify(token);
            return verifier.getSubject();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Token invalido o expirado", e);
        }
    }

    private Instant generateFechaExpiracion() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

    public String getTokenType(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT verifier = JWT.require(algorithm)
                    .withIssuer("ai-powered")
                    .build()
                    .verify(token);
            return verifier.getClaim("type").asString(); // ✅ Extraer tipo de token
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Error al obtener el tipo de token", e);
        }
    }
}