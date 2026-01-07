# Proyecto Final Tripleten - Movies Where To Watch
# 🎬 StreamWhere – Movies & Series Watchlist

Deploy: https://fredyalvarezz.github.io/Streamwhere/

## 📌 Descripción
StreamWhere es una aplicación web **Full Stack** que permite a los usuarios buscar películas y series, visualizar información detallada y guardar contenido en una lista personalizada para ver más tarde.

El proyecto integra **frontend y backend propios**, autenticación con JWT y manejo de datos en tiempo real mediante una API REST.

Este proyecto fue desarrollado como **Proyecto Final del bootcamp TripleTen**.

---

## 🚀 Funcionalidades
Los usuarios pueden:
- Registrarse e iniciar sesión con autenticación JWT
- Buscar películas y series desde una API externa
- Ver información detallada (sinopsis, imagen, año, plataforma)
- Guardar películas y series en su watchlist personal
- Eliminar contenido de su lista
- Mantener sesión activa mediante tokens
- Editar información de usuario

---

## 🧠 Arquitectura
El proyecto está dividido en:
- **Frontend:** React
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB
- **Comunicación:** API REST

---

## 🛠️ Tecnologías utilizadas

### Frontend
- React.js
- React Router DOM
- JavaScript (ES6+)
- Vite
- CSS / Responsive Design
- Fetch API
- Context API
- JWT (manejo de sesión)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs (encriptación)
- jsonwebtoken (JWT)
- Celebrate / Joi (validaciones)
- dotenv
- CORS

---

## ⚙️ Instalación y ejecución local

> ⚠️ Este proyecto requiere **Node.js y MongoDB** instalados.

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/fredyalvarezz/tripleten_final_project_Movies_wheretowatch.git

##2️⃣ Backend
cd backend
npm install
npm run dev

Configurar archivo .env:
PORT=3000
MONGO_URI=mongodb://localhost:27017/streamwhere
JWT_SECRET=your_secret_key

## 3️⃣ Frontend
cd frontend
npm install
npm run dev

La aplicación se ejecutará en:

http://localhost:5173

👤 Autor

Fredy Alvarez
Ingeniero en Sistemas | Desarrollador Web Full Stack
Bootcamp TripleTen

📂 GitHub: https://github.com/fredyalvarezz

🔗 LinkedIn: https://www.linkedin.com/in/fredyalvarezleyva/



Enlance de la página web StreamWhere:
"https://streamwhere.mooo.com"
