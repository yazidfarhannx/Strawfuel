````md
StrawFuel Backend API

StrawFuel is a sustainability platform for monitoring rice straw biomass, carbon emission analytics, and biofuel potential management.

Built using:
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger Documentation

---

Features

User Features
- JWT Authentication
- Dashboard Analytics
- Carbon Emission Analytics
- Straw Monitoring CRUD
- Sustainability Metrics
- Biomass Region Map
- Educational Articles

Admin Features
- User Management
- Role Management
- Article Management
- Region Management
- Delete Monitoring Data

---

Technology Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- Multer
- Swagger UI
- Leaflet
````
---

# 1. Clone Repository

```bash
git clone https://github.com/yazidfarhannx/Strawfuel.git
````

Masuk ke folder project:

```bash
cd Strawfuel
```

---

# 2. Install Dependencies

Install seluruh dependency:

```bash
npm install
```

---

# 3. Main Dependencies

Dependencies utama yang digunakan:

```bash
npm install express cors dotenv bcrypt jsonwebtoken multer pg @prisma/client @prisma/adapter-pg swagger-ui-express swagger-jsdoc
```

---

# 4. Development Dependencies

```bash
npm install -D nodemon prisma
```

---

# 5. Setup Environment Variables

Buat file:

```bash
.env
```

Isi:

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/strawfuel?schema=public"

JWT_SECRET=strawfuelsecret

PORT=5000
```

---

# 6. Setup PostgreSQL
---

# 7. Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

---

# 8. Run Migration

```bash
npx prisma migrate dev --name init
```

---

# 9. Seeder Admin

Jalankan:

```bash
node src/seeders/adminSeeder.js
```

Default admin:

```text
Email:
admin@strawfuel.com

Password:
admin123
```

---

# 10. Run Server

Development mode:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# 11. Package.json Scripts

Tambahkan di `package.json`:

```json
"scripts": {
    "dev": "nodemon",
    "start": "node src/server.js"
}
```

---

# 12. Swagger Documentation

Swagger tersedia di:

```text
http://localhost:5000/api-docs
```

Swagger digunakan untuk:

* testing endpoint
* melihat request body
* melihat response API
* testing JWT Bearer Token

---

# 13. Frontend Developer Setup

Jika hanya membuat frontend:

✅ cukup jalankan backend
✅ gunakan endpoint API
✅ tidak perlu membuat database baru

Frontend hanya perlu install:

```bash
npm install axios react-router-dom react-toastify leaflet react-leaflet
```

Consume API dari:

```text
http://localhost:5000
```

---

# 14. JWT Authentication

Protected endpoint membutuhkan:

```text
Authorization: Bearer YOUR_TOKEN
```

Token didapat setelah login.

Contoh penggunaan:

```js
headers: {
  Authorization: `Bearer ${token}`,
}
```

---

# 15. Upload Folder

Pastikan folder berikut tersedia:

```bash
public/uploads
```

Digunakan untuk:

* upload thumbnail artikel
* image storage

---
---

# API Base URL

```text
http://localhost:5000
```

---

# Swagger URL

```text
http://localhost:5000/api-docs
```

---

# Recommended Tools

* Postman
* pgAdmin
* VSCode
* Git

---
