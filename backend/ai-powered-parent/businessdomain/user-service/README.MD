# AI-Powered User Service

## 📋 Descripción general

Este microservicio **User Service** forma parte del proyecto AI-Powered Parent. Expone endpoints para **autenticación** y **gestión de usuarios** (CRUD) basados en Spring Boot, Spring Security, JWT y Spring Data JPA.

---

## 🚀 Requisitos previos

* Java 21 (Corretto o similar)
* Maven 3.8+
* MySQL 8.x en localhost:3306 (base de datos `ai_powered_users`)
* Aplicación configurada en `application.properties`:

  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/ai_powered_users
  spring.datasource.username=root
  spring.datasource.password=root
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

  spring.jpa.hibernate.ddl-auto=update
  server.port=8081
  ```

---

## 🛠️ Cómo ejecutar

1. Clona el repositorio y navega al módulo `user-service`.
2. Compila y corre:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
3. La API quedará accesible en **[http://localhost:8081/](http://localhost:8081/)**.

---

## 🔐 Autenticación (JWT)

### POST `/auth/register`

Crea un nuevo usuario (rol `ROLE_USER`).

* **Request** *(application/json)*:

  ```json
  {
    "username": "<string, not blank>",
    "password": "<string, not blank>"
  }
  ```
* **Response 201**:

  ```json
  {
    "accessToken": "<jwt-token>"
  }
  ```
* **Errores**:

  * 400: Validación de campos (`@NotBlank`)
  * 409: `UserAlreadyExistsException` si el username ya existe

### POST `/auth/login`

Autentica un usuario existente y devuelve JWT.

* **Request** *(application/json)*:

  ```json
  {
    "username": "<string>",
    "password": "<string>"
  }
  ```
* **Response 200**:

  ```json
  {
    "accessToken": "<jwt-token>"
  }
  ```
* **Errores**:

  * 400: JSON mal formado
  * 401: Credenciales inválidas (`BadCredentialsException`)

---

## 👥 Gestión de Usuarios

*Todos los endpoints a continuación requieren cabecera*:

```
Authorization: Bearer <accessToken>
```

### GET `/users`

* **Descripción**: Lista todos los usuarios (solo `ROLE_ADMIN`).
* **Response 200**:

  ```json
  [
    {
      "id": 1,
      "username": "juan",
      "role": "ROLE_USER",
      "createdAt": "2025-07-02T15:00:00",
      "updatedAt": "2025-07-02T15:00:00"
    },
    ...
  ]
  ```

### GET `/users/{id}`

* **Descripción**: Obtiene un usuario por ID. Permisos:

  * `ROLE_ADMIN`: puede ver cualquiera
  * `ROLE_USER`: solo su propio perfil (`#id == principal.id`).
* **Response 200** (mismo objeto JSON que arriba)
* **Errores**:

  * 403: acceso prohibido
  * 404: `UserNotFoundException` si no existe

### PUT `/users/{id}`

* **Descripción**: Actualiza campos de un usuario. Permisos:

  * `ROLE_ADMIN` o el mismo `USER`.
* **Request** *(application/json)*:

  ```json
  {
    "username": "nuevoNombre",    // opcional
    "role": "ROLE_ADMIN"          // opcional, ADMIN puede cambiar roles
  }
  ```
* **Response 200**: Usuario actualizado (mismo JSON de salida que GET)
* **Errores**:

  * 400: campos inválidos
  * 403: acceso prohibido
  * 404: `UserNotFoundException`
  * 409: `UserAlreadyExistsException` (nombre duplicado)

### DELETE `/users/{id}`

* **Descripción**: Elimina un usuario (solo `ROLE_ADMIN`).
* **Response 204 No Content**
* **Errores**:

  * 403: acceso prohibido
  * 404: `UserNotFoundException`

---

## ⚙️ DTOs principales

* **RegisterRequest**

  ```java
  public record RegisterRequest(
    @NotBlank String username,
    @NotBlank String password
  ) {}
  ```
* **LoginRequest**

  ```java
  public record LoginRequest(
    @NotBlank String username,
    @NotBlank String password
  ) {}
  ```
* **UserResponse**

  ```java
  public record UserResponse(
    Long id,
    String username,
    String role,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
  ) {}
  ```
* **UpdateUserRequest**

  ```java
  public record UpdateUserRequest(
    String username,
    String role
  ) {}
  ```
* **ErrorResponse** *(para errores genéricos)*

  ```java
  public record ErrorResponse(
    String code,
    String message,
    String detail,
    LocalDateTime timestamp
  ) {}
  ```
* **ValidationErrorResponse** *(para errores de validación)*

  ```java
  public record ValidationErrorResponse(
    String code,
    String message,
    List<ValidationError> errors,
    LocalDateTime timestamp
  ) {}
  ```

---

## 📖 Manejo de Errores

Centralizado en `GlobalExceptionHandler`:

* **400**: JSON mal formado o validación fallida
* **401**: credenciales incorrectas
* **403**: acceso denegado
* **404**: recurso no encontrado
* **409**: conflicto de negocio (usuario duplicado)
* **500**: error interno

Los errores devuelven siempre un JSON con campos:

```
code | message | detail | timestamp
```

---

*Si tienen dudas o quieren ampliar algo, me avisan!*
