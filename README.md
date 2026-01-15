# Employee Management System

A secure, full-stack Employee Management System with authentication and CRUD operations for employee records.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Admin Account

To create your first admin account, you can:

**Option A: Use Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add User"
4. Enter email and password
5. Click "Create User"

**Option B: Modify the Login component temporarily**
The Login component can be extended to include a signup form for the first user.

### 3. Run the Application
```bash
npm run dev
```

### 4. Sign In
- Open http://localhost:5173
- Sign in with your admin credentials

## Features

- JWT-based authentication with Supabase
- Secure CRUD operations for employees
- Search and filter functionality
- Responsive design
- Input validation
- Row Level Security (RLS)
- Real-time updates

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth)
- Vite

## Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed documentation including:
- Database schema
- API endpoints
- Security features
- Usage guide
- Validation rules

## Project Structure

```
src/
├── components/        # React components
├── contexts/         # React contexts (Auth)
├── services/         # API service layer
├── lib/             # Supabase configuration
└── App.tsx          # Main app component
```

## Build for Production

```bash
npm run build
```

## Type Checking

```bash
npm run typecheck
```

## Environment Variables

The following environment variables are configured in `.env`:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## License

MIT
