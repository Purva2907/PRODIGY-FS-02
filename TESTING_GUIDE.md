# Testing Guide

This guide will help you test the Employee Management System.

## Creating a Test Admin Account

### Using Supabase Dashboard

1. Go to your Supabase project: https://lhuvflhncklisicbmgof.supabase.co
2. Navigate to **Authentication** > **Users**
3. Click **"Add User"** or **"Invite User"**
4. Enter the following:
   - Email: `admin@test.com` (or your preferred email)
   - Password: `admin123` (minimum 6 characters)
5. Click **"Create User"** or **"Send Invite"**

### Using SQL (Alternative)

You can also run this SQL in the Supabase SQL Editor:

```sql
-- This creates a user account through Supabase Auth
-- Note: You'll need to use the Supabase Dashboard to create users
-- as direct SQL user creation requires additional steps
```

## Test Scenarios

### 1. Authentication Testing

#### Test Case: Valid Login
1. Navigate to the application
2. Enter valid credentials:
   - Email: `admin@test.com`
   - Password: `admin123`
3. Click "Sign In"
4. **Expected**: Successfully redirected to dashboard

#### Test Case: Invalid Login
1. Navigate to the application
2. Enter invalid credentials
3. Click "Sign In"
4. **Expected**: Error message displayed

#### Test Case: Validation Errors
1. Try to submit empty form
2. **Expected**: "Please fill in all fields" error
3. Enter invalid email format
4. **Expected**: "Please enter a valid email address" error
5. Enter password less than 6 characters
6. **Expected**: "Password must be at least 6 characters" error

### 2. Employee Creation Testing

#### Test Case: Create Valid Employee
1. Sign in to the dashboard
2. Click "Add Employee"
3. Fill in all fields:
   - Employee ID: `EMP001`
   - Name: `John Doe`
   - Email: `john.doe@company.com`
   - Phone: `+1 555 0100`
   - Department: `Engineering`
   - Role: `Software Engineer`
   - Salary: `75000`
   - Date of Joining: `2024-01-15`
4. Click "Add Employee"
5. **Expected**: Employee added successfully, redirected to list view

#### Test Case: Validation Errors
1. Click "Add Employee"
2. Try to submit empty form
3. **Expected**: All required field errors displayed
4. Enter invalid email format
5. **Expected**: "Invalid email format" error
6. Enter 0 or negative salary
7. **Expected**: "Salary must be greater than 0" error

#### Test Case: Duplicate Employee ID
1. Create an employee with ID `EMP001`
2. Try to create another employee with the same ID
3. **Expected**: Error message about duplicate employee ID

### 3. Employee List Testing

#### Test Case: View All Employees
1. Navigate to dashboard
2. **Expected**: All employees displayed in table

#### Test Case: Search Functionality
1. Enter search term in search box
2. **Expected**: List filtered to show matching employees
3. Try searching by:
   - Name
   - Email
   - Employee ID
   - Role

#### Test Case: Department Filter
1. Select a department from dropdown
2. **Expected**: Only employees from that department shown
3. Select "All Departments"
4. **Expected**: All employees shown again

### 4. Employee Update Testing

#### Test Case: Edit Employee
1. Click edit icon next to an employee
2. Modify fields (except Employee ID which is disabled)
3. Click "Update Employee"
4. **Expected**: Employee updated successfully

#### Test Case: Cancel Edit
1. Click edit icon
2. Make changes
3. Click "Cancel"
4. **Expected**: Changes discarded, returned to list view

### 5. Employee Delete Testing

#### Test Case: Delete Employee
1. Click delete icon next to an employee
2. **Expected**: Confirmation dialog appears
3. Click "Delete"
4. **Expected**: Employee deleted, removed from list

#### Test Case: Cancel Delete
1. Click delete icon
2. Click "Cancel" in confirmation dialog
3. **Expected**: Employee not deleted, dialog closes

### 6. Security Testing

#### Test Case: Unauthenticated Access
1. Sign out from the application
2. Try to access the dashboard directly
3. **Expected**: Redirected to login page

#### Test Case: RLS Enforcement
1. The database has Row Level Security enabled
2. All employee operations require authentication
3. **Expected**: Unauthenticated users cannot access data

## Sample Test Data

Here are some sample employees you can create for testing:

### Employee 1
- Employee ID: `EMP001`
- Name: `Alice Johnson`
- Email: `alice.johnson@company.com`
- Phone: `+1 555 0101`
- Department: `Engineering`
- Role: `Senior Software Engineer`
- Salary: `95000`
- Date of Joining: `2023-03-15`

### Employee 2
- Employee ID: `EMP002`
- Name: `Bob Smith`
- Email: `bob.smith@company.com`
- Phone: `+1 555 0102`
- Department: `Human Resources`
- Role: `HR Manager`
- Salary: `75000`
- Date of Joining: `2023-06-01`

### Employee 3
- Employee ID: `EMP003`
- Name: `Carol Williams`
- Email: `carol.williams@company.com`
- Phone: `+1 555 0103`
- Department: `Sales`
- Role: `Sales Representative`
- Salary: `65000`
- Date of Joining: `2023-09-20`

### Employee 4
- Employee ID: `EMP004`
- Name: `David Brown`
- Email: `david.brown@company.com`
- Phone: `+1 555 0104`
- Department: `Marketing`
- Role: `Marketing Coordinator`
- Salary: `60000`
- Date of Joining: `2024-01-10`

### Employee 5
- Employee ID: `EMP005`
- Name: `Emma Davis`
- Email: `emma.davis@company.com`
- Phone: `+1 555 0105`
- Department: `Finance`
- Role: `Financial Analyst`
- Salary: `70000`
- Date of Joining: `2023-11-15`

## Testing Checklist

- [ ] Admin can sign in successfully
- [ ] Invalid credentials show error
- [ ] Form validation works correctly
- [ ] Can create new employee
- [ ] Duplicate employee IDs are prevented
- [ ] Can view all employees
- [ ] Search functionality works
- [ ] Department filter works
- [ ] Can edit employee
- [ ] Can delete employee with confirmation
- [ ] Delete confirmation can be cancelled
- [ ] Sign out works correctly
- [ ] Unauthenticated users cannot access dashboard
- [ ] All form validations display correctly
- [ ] Responsive design works on mobile

## Performance Testing

1. Create 20+ employees
2. Test search performance
3. Test filtering performance
4. Test loading time

## Browser Compatibility Testing

Test the application in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- No pagination implemented (all employees loaded at once)
- No bulk import/export functionality
- No advanced filtering options
- No role-based access control (all authenticated users have same permissions)

## Reporting Issues

If you encounter any issues during testing:
1. Note the exact steps to reproduce
2. Capture any error messages
3. Note the browser and operating system
4. Check the browser console for errors
