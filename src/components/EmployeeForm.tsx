import { useState, useEffect, FormEvent } from 'react';
import { Employee, EmployeeFormData } from '../lib/supabase';
import { employeeService } from '../services/employeeService';
import { Save, X } from 'lucide-react';

interface EmployeeFormProps {
  employee: Employee | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EmployeeForm({ employee, onSuccess, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    employee_id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    salary: 0,
    date_of_joining: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (employee) {
      setFormData({
        employee_id: employee.employee_id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        role: employee.role,
        salary: employee.salary,
        date_of_joining: employee.date_of_joining,
      });
    }
  }, [employee]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.employee_id.trim()) {
      newErrors.employee_id = 'Employee ID is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }

    if (!formData.date_of_joining) {
      newErrors.date_of_joining = 'Date of joining is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof EmployeeFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    if (employee) {
      const { error } = await employeeService.updateEmployee(employee.id, formData);
      if (error) {
        setSubmitError(error.message || 'Failed to update employee');
      } else {
        onSuccess();
      }
    } else {
      const { error } = await employeeService.createEmployee(formData);
      if (error) {
        setSubmitError(error.message || 'Failed to create employee');
      } else {
        onSuccess();
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h2>
        <p className="text-gray-600 mt-1">
          {employee
            ? 'Update employee information below'
            : 'Fill in the details to add a new employee'}
        </p>
      </div>

      {submitError && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 mb-2">
            Employee ID <span className="text-red-500">*</span>
          </label>
          <input
            id="employee_id"
            type="text"
            value={formData.employee_id}
            onChange={(e) => handleChange('employee_id', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.employee_id ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="EMP001"
            disabled={loading || !!employee}
          />
          {errors.employee_id && <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
            disabled={loading}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 234 567 8900"
            disabled={loading}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            id="department"
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.department ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            id="role"
            type="text"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Software Engineer"
            disabled={loading}
          />
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            Salary <span className="text-red-500">*</span>
          </label>
          <input
            id="salary"
            type="number"
            value={formData.salary || ''}
            onChange={(e) => handleChange('salary', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.salary ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="50000"
            disabled={loading}
            min="0"
            step="0.01"
          />
          {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
        </div>

        <div>
          <label htmlFor="date_of_joining" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Joining <span className="text-red-500">*</span>
          </label>
          <input
            id="date_of_joining"
            type="date"
            value={formData.date_of_joining}
            onChange={(e) => handleChange('date_of_joining', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.date_of_joining ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {errors.date_of_joining && (
            <p className="text-red-500 text-sm mt-1">{errors.date_of_joining}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}</span>
        </button>
      </div>
    </form>
  );
}
