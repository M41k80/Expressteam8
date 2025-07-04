# Expressteam8

🧩 Creadores de la App
👥 Daniel Renato Mamani Pérez 📧 danny2003renato@gmail.com 💻 Rol: Frontend
👥 Magdiel Mora 📧 m41k80m@gmail.com 💻 Rol: Frontend
👥 Jeremias Rivelli 📧 jeremias.j.riv@gmail.com 💻 Rol: Backend
👥 Mateo Baccillere 📧 mateo.baccillere19@gmail.com 💻 Rol: Backend
👥 Wanda ursula gutierrez 📧 wandaugutierrez@gmail.com 💻 Rol: UX/UI Designer
👥 Luis Prado 📧 luisprado.qa@gmail.com 💻 Rol: Tester QA


> **Tus Emails, potenciados por Inteligencia Artificial**  
Nuestra plataforma genera **correos electrónicos de marketing altamente efectivos en minutos**. Aprovecha el poder de los modelos de lenguaje para crear mensajes personalizados que conectan con tu audiencia.

---

## 🚀 Descripción General

Expressteam8 es una aplicación **full-stack** que combina:

- Un **backend Java/Maven** con microservicios:
  - **User Service**: Gestión de usuarios, autenticación y registro.
  - **Mail Service**: Generación y almacenamiento de correos electrónicos.
  - **Engagement Service**: Historial de interacciones.
  - **Gateway Service**: Punto único de entrada y ruteo de APIs.

- Un **frontend Next.js/TypeScript**:
  - Interfaz intuitiva para generar, visualizar y copiar correos.
  - Funcionalidad de login/registro.
  - Panel de historial de correos generados.
  - Consumo de APIs del backend y OpenRouter (Mistral) para IA.

---

## ✨ Características

✅ **Generación automática de emails de marketing**  
✅ **Historial de correos generados**  
✅ **Autenticación de usuarios (simulada o real según configuración)**  
✅ **Vista previa y copia al portapapeles**  
✅ **Interfaz responsive y moderna**

---

## 📂 Arquitectura del Proyecto

### Backend (Java / Maven)

Ubicado en `backend/ai-powered-parent`, dividido en módulos:

- **businessdomain**
  - `engagement-service`
  - `mail-service`
  - `user-service`
- **infraestructuredomain**
  - `gateway`

El **Gateway Service** expone las APIs REST que consume el frontend.

---

### Frontend (Next.js / TypeScript)

Ubicado en `frontend`:

**Principales rutas y páginas:**

- `/`: Landing page
- `/auth/login`: Login de usuario
- `/auth/register`: Registro de usuario
- `/dashboard`: Generador de correos
- `/dashboard/history`: Historial de correos
- `/dashboard/settings`: Configuración (en progreso)
- `/api/*`: Rutas internas para proxy y generación de emails

**Componentes reutilizables:**

- `components/ui`: Botones, inputs, dialogs
- `components`: Header, footer, modo oscuro

**Contextos globales:**

- `AuthContext`: Estado de autenticación
- `DashboardContext`: Estado de generación de emails

**Servicios:**

- `authService`: Login y registro
- `emailService`: Generación de emails con IA

---

## ⚡ Instalación y Ejecución

### Requisitos

- Node.js >= 18
- Java 17+
- Maven

### Frontend

```bash
cd frontend
npm install
npm run dev

```

**Por defecto, se ejecuta en: http://localhost:3000 **

🧠 Cómo funciona la generación de correos
	1.	El usuario inicia sesión o se registra.
	2.	Desde el Dashboard, introduce un prompt de marketing.
	3.	El frontend envía el prompt a:
	•	El backend (/engage/generate) si está habilitado.
	•	O directamente a OpenRouter (Mistral) si está configurado.
	4.	La IA devuelve:
	•	Asunto
	•	Cuerpo del correo
	5.	El correo generado se guarda en el historial y queda listo para copiar o enviar.

⸻

✏️ Personalización

Para cambiar el modelo de IA:
	•	Modifica el servicio de generación (emailService).
	•	Configura tu clave de OpenRouter en variables de entorno.

Para cambiar la apariencia:
	•	Edita componentes en frontend/src/components/ui.

⸻

📃 Licencia

MIT

⸻

🤝 Contribución

Si deseas contribuir:
	1.	Haz un fork de este repositorio.
	2.	Crea una rama (feature/tu-feature).
	3.	Haz commit de tus cambios.
	4.	Abre un Pull Request.

⸻

📞 Contacto

¿Preguntas o sugerencias?
Email: m41k80@icloud.com
LinkedIn: https://www.linkedin.com/in/jose-magdiel-mora-perez-0384492b9/

⸻

Expressteam8 - Potencia tu marketing con inteligencia artificial
