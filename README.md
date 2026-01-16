# Employee Management System

🧑‍💼 **A Full-Stack Employee Management System**

This repository hosts a full-stack web app for managing employee records securely. It includes authentication, CRUD operations, filtering/search, and client-side responsiveness.

## 📦 Features

- JWT based authentication  
- Employee record management (Create, Read, Update, Delete)  
- Search & filtering  
- Responsive UI  
- Row-level security  
- Real-time updates

## 🛠 Tech Stack

- React 18 + TypeScript  
- Tailwind CSS  
- Supabase (PostgreSQL + Auth)  
- Vite

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
Create Admin Account

Use the Supabase dashboard or modify login component to seed a first user.

Run Locally
npm run dev
Access app at: http://localhost:5173
```
🗂 Project Structure
```
src/
├── components/        # Reusable React components
├── contexts/          # Context providers (Auth, App state)
├── services/          # API service logic
└── App.tsx            # Root component
```
