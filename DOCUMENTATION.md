# Employee Management System - Documentation

## Overview

A secure, full-stack Employee Management System that allows administrators to perform CRUD operations on employee records. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Authentication & Authorization
- JWT-based authentication via Supabase Auth
- Password hashing handled automatically by Supabase
- Protected routes - all employee operations require authentication
- Session management with automatic token refresh

### Employee CRUD Operations
- **Create**: Add new employees with complete validation
- **Read**: View all employees in a searchable, filterable table
- **Update**: Edit employee information
- **Delete**: Remove employees with confirmation dialog

### Security Features
- Row Level Security (RLS) enabled on all tables
- SQL injection prevention through parameterized queries
- Secure API endpoints with authentication checks
- Input validation on both frontend and backend
- Proper error handling with user-friendly messages

### UI Features
- Responsive design that works on all devices
- Clean dashboard layout
- Real-time search and department filtering
- Form validation with helpful error messages
- Loading states and error handling
- Confirmation dialogs for destructive actions

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Authentication**: Supabase Auth (JWT)
- **Build Tool**: Vite

## Database Schema

### Employees Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key, auto-generated |
| employee_id | text | Unique employee identifier (e.g., EMP001) |
| name | text | Full name of the employee |
| email | text | Email address (unique) |
| phone | text | Contact phone number |
| department | text | Department name |
| role | text | Job role/position |
| salary | numeric(10,2) | Salary amount |
| date_of_joining | date | Date when employee joined |
| created_at | timestamptz | Record creation timestamp |
| updated_at | timestamptz | Record last update timestamp |
| created_by | uuid | Reference to admin who created the record |

### RLS Policies

1. **SELECT**: Authenticated users can view all employees
2. **INSERT**: Authenticated users can insert employees (created_by must match auth.uid())
3. **UPDATE**: Authenticated users can update all employees
4. **DELETE**: Authenticated users can delete any employee

## API Endpoints (Supabase Client)

All API calls are made through the Supabase client using the `employeeService`:

### Get All Employees
```typescript
employeeService.getAllEmployees()
// Returns: { data: Employee[] | null, error: Error | null }
```

### Get Employee by ID
```typescript
employeeService.getEmployeeById(id: string)
// Returns: { data: Employee | null, error: Error | null }
```

### Create Employee
```typescript
employeeService.createEmployee(employeeData: EmployeeFormData)
// Returns: { data: Employee | null, error: Error | null }
```

### Update Employee
```typescript
employeeService.updateEmployee(id: string, employeeData: Partial<EmployeeFormData>)
// Returns: { data: Employee | null, error: Error | null }
```

### Delete Employee
```typescript
employeeService.deleteEmployee(id: string)
// Returns: { error: Error | null }
```

### Search Employees
```typescript
employeeService.searchEmployees(query: string)
// Returns: { data: Employee[] | null, error: Error | null }
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (already configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. The environment variables are already configured in `.env`:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

3. The database schema has been applied automatically

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Type checking:
```bash
npm run typecheck
```

## Usage Guide

### First Time Setup

1. Create an admin account by signing up:
   - Use Supabase Dashboard to create a user
   - Or modify the Login component to show a signup form

2. Sign in with your admin credentials

### Managing Employees

#### Adding an Employee
1. Click "Add Employee" button
2. Fill in all required fields:
   - Employee ID (must be unique)
   - Full Name
   - Email (must be valid format)
   - Phone (must be valid format)
   - Department (select from dropdown)
   - Role
   - Salary (must be > 0)
   - Date of Joining
3. Click "Add Employee" to save

#### Viewing Employees
- All employees are displayed in a table
- Use the search bar to filter by name, email, employee ID, or role
- Use the department dropdown to filter by department
- View employee details including contact info, salary, and joining date

#### Editing an Employee
1. Click the edit icon (pencil) next to any employee
2. Modify the fields (Employee ID cannot be changed)
3. Click "Update Employee" to save changes

#### Deleting an Employee
1. Click the delete icon (trash) next to any employee
2. Confirm the deletion in the dialog
3. The employee will be permanently removed

## Validation Rules

### Employee ID
- Required
- Must be unique

### Name
- Required
- Minimum 2 characters

### Email
- Required
- Must be valid email format
- Must be unique

### Phone
- Required
- Must be valid phone format

### Department
- Required
- Must select from predefined list

### Role
- Required

### Salary
- Required
- Must be greater than 0

### Date of Joining
- Required
- Must be a valid date

## Security Best Practices

1. **Authentication**: All routes are protected and require valid JWT tokens
2. **Password Security**: Passwords are hashed using bcrypt (handled by Supabase)
3. **SQL Injection Prevention**: All queries use parameterized statements
4. **XSS Prevention**: React automatically escapes output
5. **HTTPS**: Always use HTTPS in production
6. **Environment Variables**: Never commit secrets to version control
7. **Row Level Security**: Database-level security ensures users can only access authorized data

## Error Handling

The application includes comprehensive error handling:
- Network errors are caught and displayed to users
- Validation errors are shown inline with form fields
- Database errors are logged and user-friendly messages are displayed
- Authentication errors redirect to login page

## Code Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard layout
│   ├── EmployeeList.tsx       # Employee table with search/filter
│   ├── EmployeeForm.tsx       # Add/Edit employee form
│   ├── DeleteConfirmation.tsx # Delete confirmation modal
│   └── Login.tsx              # Login page
├── contexts/
│   └── AuthContext.tsx        # Authentication context
├── services/
│   └── employeeService.ts     # Employee API service
├── lib/
│   └── supabase.ts           # Supabase client configuration
├── App.tsx                    # Main app component
├── main.tsx                   # App entry point
└── index.css                  # Global styles
```

## Future Enhancements

Potential improvements for the system:
- Role-based access control (Admin vs HR)
- Export employees to CSV/Excel
- Pagination for large datasets
- Advanced filtering options
- Employee activity logging
- Bulk import functionality
- Employee performance tracking
- Document management
- Leave management

## Support

For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- React Documentation: https://react.dev
- Tailwind CSS Documentation: https://tailwindcss.com/docs
