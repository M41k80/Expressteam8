# Express team8 
<img src="frontend/public/App.png" alt="App logo" width="400"/>
 🧩 Creadores de la App:

### 👥 Magdiel Mora 📧 m41k80m@gmail.com 💻 Rol: Frontend 
<a href="https://www.linkedin.com/in/jose-magdiel-mora-perez-0384492b9/" target="_blank">
  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="32" height="32">
</a>


### 👥 Daniel Renato Mamani Pérez 📧 danny2003renato@gmail.com 💻 Rol: Frontend
<a href="https://www.linkedin.com/in/danielrmp/" target="_blank">
  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="32" height="32">
</a>


### 👥 Jeremias Rivelli 📧 jeremias.j.riv@gmail.com 💻 Rol: Backend
<a href="https://www.linkedin.com/in/rivelli-jeremias/" target="_blank">
  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="32" height="32">
</a>

### 👥 Mateo Baccillere 📧 mateo.baccillere19@gmail.com 💻 Rol: Backend
<a href="https://www.linkedin.com/in/mateo-baccillere-96036b358/" target="_blank">
  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="32" height="32">
</a>
### 👥 Wanda ursula gutierrez 📧 wandaugutierrez@gmail.com 💻 Rol: UX/UI Designer
<a href="https://www.linkedin.com/in/wanda-gutierrez/" target="_blank">
  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="32" height="32">
</a>



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


🌱 Roadmap – Posibles Mejoras Futuras

A continuación se detallan algunas ideas de funcionalidades que podrían implementarse en versiones futuras para ampliar las capacidades de la aplicación:

✅ Personalización avanzada de tono y estilo
	•	Permitir que el usuario seleccione si el correo debe sonar formal, amistoso, urgente, etc.
	•	Ajuste de la longitud y el nivel de detalle del contenido.

✅ Plantillas predefinidas
	•	Ofrecer plantillas de marketing listas para usar (bienvenida, promoción, recuperación de carrito, fidelización).
	•	Sistema de favoritos para guardar plantillas propias.

✅ Multilingüe
	•	Generación automática de correos en otros idiomas (español, inglés, portugués, etc.).

✅ Editor enriquecido
	•	Editor visual con formato (negrita, listas, enlaces).
	•	Previsualización del correo en distintos clientes de email.

✅ Envío directo
	•	Integración con servicios de emailing (Mailchimp, SendGrid, SMTP propio).
	•	Programación de envíos y seguimiento.

✅ Historial mejorado
	•	Etiquetas y filtros por tipo de correo o campaña.
	•	Estadísticas de uso y generación por usuario.

✅ Gestión de equipos y colaboración
	•	Roles de usuario (administrador, editor).
	•	Compartir correos generados con miembros del equipo.

✅ IA más inteligente
	•	Sugerencias automáticas basadas en la industria o el objetivo de la campaña.
	•	A/B testing de asunto y contenido.

✅ Seguridad y auditoría
	•	Registros de actividad detallados.
	•	Autenticación en dos pasos y políticas de acceso avanzadas.

✅ Integraciones
	•	Conexión con CRMs (Hubspot, Salesforce).
	•	Integración con plataformas eCommerce (Shopify, WooCommerce).

✅ API pública
	•	Exponer endpoints seguros que permitan generar correos de forma programática desde otras aplicaciones.
