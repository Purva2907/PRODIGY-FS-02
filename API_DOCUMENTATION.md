# API Documentation

This document describes the Employee Management System API implementation using Supabase.

## Authentication

All API requests require authentication. The application uses Supabase Auth with JWT tokens.

### Authentication Flow

1. User signs in via the login form
2. Supabase Auth returns a JWT token
3. The token is automatically included in all subsequent requests
4. Token is refreshed automatically by Supabase client

## Employee Service API

All employee operations are handled through the `employeeService` which wraps Supabase client calls.

### Base URL

```
Supabase URL: https://lhuvflhncklisicbmgof.supabase.co
```

### Authentication Headers

All requests automatically include:
- `Authorization: Bearer <jwt_token>`
- `apikey: <supabase_anon_key>`

## Endpoints

### 1. Get All Employees

Retrieves all employees from the database, ordered by creation date (newest first).

**Method:** `getAllEmployees()`

**SQL Equivalent:**
```sql
SELECT * FROM employees ORDER BY created_at DESC;
```

**Returns:**
```typescript
{
  data: Employee[] | null,
  error: Error | null
}
```

**Response Example:**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "employee_id": "EMP001",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 555 0100",
      "department": "Engineering",
      "role": "Software Engineer",
      "salary": 75000,
      "date_of_joining": "2024-01-15",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z",
      "created_by": "admin-user-id"
    }
  ],
  "error": null
}
```

**Error Response:**
```json
{
  "data": null,
  "error": {
    "message": "Error message"
  }
}
```

---

### 2. Get Employee By ID

Retrieves a single employee by their UUID.

**Method:** `getEmployeeById(id: string)`

**Parameters:**
- `id` (string, required): Employee UUID

**SQL Equivalent:**
```sql
SELECT * FROM employees WHERE id = $1;
```

**Returns:**
```typescript
{
  data: Employee | null,
  error: Error | null
}
```

**Response Example:**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "employee_id": "EMP001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555 0100",
    "department": "Engineering",
    "role": "Software Engineer",
    "salary": 75000,
    "date_of_joining": "2024-01-15",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z",
    "created_by": "admin-user-id"
  },
  "error": null
}
```

---

### 3. Create Employee

Creates a new employee record.

**Method:** `createEmployee(employeeData: EmployeeFormData)`

**Parameters:**
```typescript
{
  employee_id: string,      // Unique employee identifier
  name: string,             // Full name
  email: string,            // Valid email address
  phone: string,            // Contact phone
  department: string,       // Department name
  role: string,             // Job role
  salary: number,           // Salary amount (must be > 0)
  date_of_joining: string   // Date in YYYY-MM-DD format
}
```

**SQL Equivalent:**
```sql
INSERT INTO employees (
  employee_id, name, email, phone,
  department, role, salary, date_of_joining,
  created_by
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;
```

**Returns:**
```typescript
{
  data: Employee | null,
  error: Error | null
}
```

**Success Response:**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "employee_id": "EMP001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555 0100",
    "department": "Engineering",
    "role": "Software Engineer",
    "salary": 75000,
    "date_of_joining": "2024-01-15",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z",
    "created_by": "admin-user-id"
  },
  "error": null
}
```

**Error Cases:**
- Duplicate employee_id: `"duplicate key value violates unique constraint"`
- Duplicate email: `"duplicate key value violates unique constraint"`
- Missing required fields: `"null value in column violates not-null constraint"`
- User not authenticated: `"User not authenticated"`

---

### 4. Update Employee

Updates an existing employee record.

**Method:** `updateEmployee(id: string, employeeData: Partial<EmployeeFormData>)`

**Parameters:**
- `id` (string, required): Employee UUID
- `employeeData` (object): Fields to update (can be partial)

**SQL Equivalent:**
```sql
UPDATE employees
SET name = $1, email = $2, phone = $3,
    department = $4, role = $5, salary = $6,
    date_of_joining = $7, updated_at = NOW()
WHERE id = $8
RETURNING *;
```

**Returns:**
```typescript
{
  data: Employee | null,
  error: Error | null
}
```

**Success Response:**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "employee_id": "EMP001",
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "phone": "+1 555 0100",
    "department": "Engineering",
    "role": "Senior Software Engineer",
    "salary": 85000,
    "date_of_joining": "2024-01-15",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-16T15:30:00Z",
    "created_by": "admin-user-id"
  },
  "error": null
}
```

**Error Cases:**
- Employee not found: Returns null data
- Duplicate email: `"duplicate key value violates unique constraint"`
- Invalid data: Validation error

---

### 5. Delete Employee

Deletes an employee record permanently.

**Method:** `deleteEmployee(id: string)`

**Parameters:**
- `id` (string, required): Employee UUID

**SQL Equivalent:**
```sql
DELETE FROM employees WHERE id = $1;
```

**Returns:**
```typescript
{
  error: Error | null
}
```

**Success Response:**
```json
{
  "error": null
}
```

**Error Cases:**
- Employee not found: Still returns success
- Database error: Returns error object

---

### 6. Search Employees

Searches employees by name, email, employee_id, or department.

**Method:** `searchEmployees(query: string)`

**Parameters:**
- `query` (string, required): Search term

**SQL Equivalent:**
```sql
SELECT * FROM employees
WHERE name ILIKE '%query%'
   OR email ILIKE '%query%'
   OR employee_id ILIKE '%query%'
   OR department ILIKE '%query%'
ORDER BY created_at DESC;
```

**Returns:**
```typescript
{
  data: Employee[] | null,
  error: Error | null
}
```

**Response Example:**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "employee_id": "EMP001",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 555 0100",
      "department": "Engineering",
      "role": "Software Engineer",
      "salary": 75000,
      "date_of_joining": "2024-01-15",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z",
      "created_by": "admin-user-id"
    }
  ],
  "error": null
}
```

---

## Data Types

### Employee

```typescript
interface Employee {
  id: string;                    // UUID
  employee_id: string;           // Unique identifier
  name: string;                  // Full name
  email: string;                 // Email address
  phone: string;                 // Phone number
  department: string;            // Department
  role: string;                  // Job role
  salary: number;                // Salary amount
  date_of_joining: string;       // ISO date string
  created_at: string;            // ISO timestamp
  updated_at: string;            // ISO timestamp
  created_by: string;            // Admin user UUID
}
```

### EmployeeFormData

```typescript
interface EmployeeFormData {
  employee_id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  salary: number;
  date_of_joining: string;
}
```

## Security

### Row Level Security (RLS)

All database operations are protected by RLS policies:

1. **SELECT Policy**: Authenticated users can view all employees
   ```sql
   CREATE POLICY "Authenticated users can view all employees"
     ON employees FOR SELECT
     TO authenticated
     USING (true);
   ```

2. **INSERT Policy**: Authenticated users can insert employees (must set created_by)
   ```sql
   CREATE POLICY "Authenticated users can insert employees"
     ON employees FOR INSERT
     TO authenticated
     WITH CHECK (auth.uid() = created_by);
   ```

3. **UPDATE Policy**: Authenticated users can update all employees
   ```sql
   CREATE POLICY "Authenticated users can update employees"
     ON employees FOR UPDATE
     TO authenticated
     USING (true)
     WITH CHECK (true);
   ```

4. **DELETE Policy**: Authenticated users can delete any employee
   ```sql
   CREATE POLICY "Authenticated users can delete employees"
     ON employees FOR DELETE
     TO authenticated
     USING (true);
   ```

### SQL Injection Prevention

All queries use parameterized statements through Supabase client, which automatically prevents SQL injection attacks.

### Authentication

- JWT tokens are used for authentication
- Tokens are automatically managed by Supabase Auth
- Tokens expire and are refreshed automatically
- All API calls check for valid authentication

## Error Handling

All API methods return a consistent error format:

```typescript
{
  data: null,
  error: {
    message: string,
    details?: string,
    hint?: string,
    code?: string
  }
}
```

Common error codes:
- `23505`: Unique constraint violation (duplicate)
- `23502`: Not null constraint violation (missing required field)
- `42501`: Insufficient privileges
- `PGRST116`: Row not found

## Rate Limiting

Supabase has built-in rate limiting:
- Anonymous requests: Limited based on project tier
- Authenticated requests: Higher limits based on project tier

## Best Practices

1. Always handle both success and error cases
2. Check authentication status before making requests
3. Validate data on frontend before sending to API
4. Use TypeScript types for type safety
5. Handle network errors gracefully
6. Show loading states during API calls
7. Display user-friendly error messages

## Examples

### Creating an Employee

```typescript
import { employeeService } from './services/employeeService';

const newEmployee = {
  employee_id: 'EMP001',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 555 0100',
  department: 'Engineering',
  role: 'Software Engineer',
  salary: 75000,
  date_of_joining: '2024-01-15'
};

const { data, error } = await employeeService.createEmployee(newEmployee);

if (error) {
  console.error('Failed to create employee:', error);
} else {
  console.log('Employee created:', data);
}
```

### Searching Employees

```typescript
const { data, error } = await employeeService.searchEmployees('john');

if (error) {
  console.error('Search failed:', error);
} else {
  console.log('Found employees:', data);
}
```

### Updating an Employee

```typescript
const updates = {
  salary: 85000,
  role: 'Senior Software Engineer'
};

const { data, error } = await employeeService.updateEmployee(
  'employee-uuid',
  updates
);

if (error) {
  console.error('Update failed:', error);
} else {
  console.log('Employee updated:', data);
}
```
