import { useState, useEffect } from 'react';
import { Employee } from '../lib/supabase';
import { employeeService } from '../services/employeeService';
import { Search, Edit2, Trash2, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import DeleteConfirmation from './DeleteConfirmation';

interface EmployeeListProps {
  onEdit: (employee: Employee) => void;
}

export default function EmployeeList({ onEdit }: EmployeeListProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [searchQuery, departmentFilter, employees]);

  const loadEmployees = async () => {
    setLoading(true);
    const { data, error } = await employeeService.getAllEmployees();
    if (error) {
      setError('Failed to load employees');
    } else {
      setEmployees(data || []);
    }
    setLoading(false);
  };

  const filterEmployees = () => {
    let filtered = [...employees];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.employee_id.toLowerCase().includes(query) ||
          emp.role.toLowerCase().includes(query)
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter((emp) => emp.department === departmentFilter);
    }

    setFilteredEmployees(filtered);
  };

  const handleDelete = async (id: string) => {
    const { error } = await employeeService.deleteEmployee(id);
    if (error) {
      setError('Failed to delete employee');
    } else {
      await loadEmployees();
    }
    setDeleteId(null);
  };

  const departments = Array.from(new Set(employees.map((emp) => emp.department))).sort();

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, employee ID, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No employees found</p>
          <p className="text-gray-400 text-sm mt-2">
            {searchQuery || departmentFilter
              ? 'Try adjusting your search or filters'
              : 'Add your first employee to get started'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Salary</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-medium text-blue-600">
                      {employee.employee_id}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-1" />
                        {employee.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-3 h-3 mr-1" />
                        {employee.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      {employee.department}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{employee.role}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-gray-900 font-medium">
                      <DollarSign className="w-4 h-4" />
                      {employee.salary.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(employee.date_of_joining).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(employee)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit employee"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(employee.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <DeleteConfirmation
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
