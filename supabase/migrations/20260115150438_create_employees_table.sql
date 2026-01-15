/*
  # Employee Management System Database Schema

  1. New Tables
    - `employees`
      - `id` (uuid, primary key) - Unique identifier for each employee
      - `employee_id` (text, unique) - Employee ID visible to users (e.g., EMP001)
      - `name` (text) - Full name of the employee
      - `email` (text, unique) - Email address
      - `phone` (text) - Contact phone number
      - `department` (text) - Department name (e.g., Engineering, HR, Sales)
      - `role` (text) - Job role/position
      - `salary` (numeric) - Salary amount
      - `date_of_joining` (date) - Date when employee joined
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record last update timestamp
      - `created_by` (uuid) - Reference to admin who created the record

  2. Security
    - Enable RLS on `employees` table
    - Add policy for authenticated users to read all employees
    - Add policy for authenticated users to insert employees
    - Add policy for authenticated users to update employees
    - Add policy for authenticated users to delete employees
    
  3. Important Notes
    - All employee operations require authentication
    - Password hashing is handled by Supabase Auth
    - JWT tokens are automatically managed by Supabase
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  department text NOT NULL,
  role text NOT NULL,
  salary numeric(10, 2) NOT NULL,
  date_of_joining date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admins)
CREATE POLICY "Authenticated users can view all employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert employees"
  ON employees
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update employees"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete employees"
  ON employees
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_employees_employee_id ON employees(employee_id);
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_employees_updated_at ON employees;
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
