# 🚀 Node.js + Express + PostgreSQL + Prisma Starter

This project demonstrates how to connect **Node.js** + **Express.js** with a **PostgreSQL** database using **Prisma ORM**.  
Follow the steps below to set up from scratch.

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) installed locally or use [Supabase](https://supabase.com/) / [Neon](https://neon.tech/) / [Railway](https://railway.app/) for free Postgres hosting
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## 🛠️ Setup Guide

### 1. Initialize Project
```bash
mkdir prisma-express-postgres
cd prisma-express-postgres
npm init -y
2. Install Dependencies
bash
Copy code
npm install express @prisma/client
npm install --save-dev prisma nodemon
3. Initialize Prisma
bash
Copy code
npx prisma init
This creates:

.env → stores your PostgreSQL connection URL

prisma/schema.prisma → defines your database schema

⚙️ Configure Database
Open .env and set your Postgres connection string:

env
Copy code
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
In prisma/schema.prisma, define a simple model:

prisma
Copy code
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String?
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
📤 Run Migration
bash
Copy code
npx prisma migrate dev --name init
This:

Creates tables in your Postgres DB

Generates the Prisma Client

🖥️ Express Server Setup
Create index.js:

js
Copy code
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Express + Prisma + PostgreSQL is running!");
});

// Create User
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
▶️ Run the Project
bash
Copy code
npx nodemon index.js
Now test with:

POST http://localhost:3000/users → { "name": "Raj", "email": "raj@example.com" }

GET http://localhost:3000/users

🛠️ Useful Prisma Commands
npx prisma studio → open GUI to explore database

npx prisma format → format schema.prisma

npx prisma generate → regenerate client if schema changes

npx prisma migrate dev --name <name> → apply new migrations

✅ Summary
npm init -y → start project

npm install express prisma @prisma/client → install deps

npx prisma init → setup Prisma

Configure .env with Postgres URL

Define models in schema.prisma

npx prisma migrate dev --name init → create DB tables

Setup Express server and connect with Prisma
