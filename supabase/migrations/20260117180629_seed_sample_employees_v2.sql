/*
  # Seed Sample Employee Data (v2)

  1. Data Insertion
    - Inserts 10 sample employees across different departments
    - Creates realistic employee records for testing and demonstration
    - Sets created_by to NULL for seed data
  
  2. Sample Employees Added
    - Engineering department: 3 employees
    - Human Resources: 2 employees
    - Sales: 2 employees
    - Marketing: 1 employee
    - Finance: 1 employee
    - Operations: 1 employee
*/

-- Allow NULL created_by for seed data
INSERT INTO employees (
  employee_id, name, email, phone, 
  department, role, salary, date_of_joining, created_by
) VALUES
  ('EMP001', 'Alice Johnson', 'alice.johnson@company.com', '+1 (555) 123-0001', 'Engineering', 'Senior Software Engineer', 95000.00, '2023-03-15', NULL),
  ('EMP002', 'Bob Smith', 'bob.smith@company.com', '+1 (555) 123-0002', 'Engineering', 'Software Engineer', 75000.00, '2023-06-01', NULL),
  ('EMP003', 'Charlie Brown', 'charlie.brown@company.com', '+1 (555) 123-0003', 'Engineering', 'Junior Software Engineer', 55000.00, '2024-01-10', NULL),
  ('EMP004', 'Diana Prince', 'diana.prince@company.com', '+1 (555) 123-0004', 'Human Resources', 'HR Manager', 75000.00, '2023-09-20', NULL),
  ('EMP005', 'Emma Davis', 'emma.davis@company.com', '+1 (555) 123-0005', 'Human Resources', 'HR Specialist', 60000.00, '2024-02-15', NULL),
  ('EMP006', 'Frank Miller', 'frank.miller@company.com', '+1 (555) 123-0006', 'Sales', 'Sales Manager', 80000.00, '2023-04-12', NULL),
  ('EMP007', 'Grace Lee', 'grace.lee@company.com', '+1 (555) 123-0007', 'Sales', 'Sales Representative', 65000.00, '2023-11-08', NULL),
  ('EMP008', 'Henry Wilson', 'henry.wilson@company.com', '+1 (555) 123-0008', 'Marketing', 'Marketing Coordinator', 60000.00, '2024-01-22', NULL),
  ('EMP009', 'Isabella Martinez', 'isabella.martinez@company.com', '+1 (555) 123-0009', 'Finance', 'Financial Analyst', 70000.00, '2023-07-30', NULL),
  ('EMP010', 'Jack Anderson', 'jack.anderson@company.com', '+1 (555) 123-0010', 'Operations', 'Operations Manager', 72000.00, '2023-05-18', NULL)
ON CONFLICT (employee_id) DO NOTHING;
