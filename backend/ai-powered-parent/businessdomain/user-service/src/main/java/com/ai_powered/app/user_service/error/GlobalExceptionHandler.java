package com.ai_powered.app.user_service.error;

import com.ai_powered.app.user_service.dto.ErrorResponse;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(EntityNotFoundException ex) {
        log.warn("404 – Entidad no encontrada: {}", ex.getMessage());
        var body = new ErrorResponse(
                "404_NOT_FOUND",
                "Recurso no encontrado",
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UsernameNotFoundException ex) {
        log.warn("404 – Usuario no encontrado: {}", ex.getMessage());
        var body = new ErrorResponse(
                "404_USER_NOT_FOUND",
                "Usuario no encontrado",
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleAuthFailed(BadCredentialsException ex) {
        log.warn("401 – Credenciales inválidas: {}", ex.getMessage());
        var body = new ErrorResponse(
                "401_BAD_CREDENTIALS",
                "Credenciales inválidas",
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArg(IllegalArgumentException ex) {
        log.warn("400 – Argumento inválido: {}", ex.getMessage());
        var body = new ErrorResponse(
                "400_BAD_REQUEST",
                "Argumento inválido",
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(body);
    }

    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        log.warn("405 – Método HTTP no permitido: {}", ex.getMethod());
        var body = new ErrorResponse(
                "405_METHOD_NOT_ALLOWED",
                "Método no permitido",
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .headers(headers)
                .body(body);
    }

    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        log.warn("400 – Cuerpo de solicitud inválido o ausente: {}", ex.getMessage());
        var body = new ErrorResponse(
                "400_BAD_REQUEST",
                "Cuerpo de solicitud inválido o ausente",
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .headers(headers)
                .body(body);
    }

    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        log.warn("400 – Falló validación de argumentos: {} errores", ex.getFieldErrors().size());
        List<ValidationError> errors = ex.getFieldErrors()
                .stream()
                .map(err -> new ValidationError(err.getField(), err.getDefaultMessage()))
                .toList();

        var body = new ValidationErrorResponse(
                "400_VALIDATION_ERROR",
                "Errores de validación",
                errors,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .headers(headers)
                .body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception ex) {
        log.error("500 – Error interno del servidor: {}", ex.getMessage(), ex);
        var body = new ErrorResponse(
                "500_INTERNAL_SERVER_ERROR",
                "Error interno del servidor",
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

    // DTOs internos para validación
    public record ValidationError(String field, String error) {}
    public record ValidationErrorResponse(
            String code,
            String message,
            List<ValidationError> errors,
            LocalDateTime timestamp
    ) {}
}
