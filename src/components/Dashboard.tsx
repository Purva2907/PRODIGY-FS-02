import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Users, UserPlus } from 'lucide-react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import { Employee } from '../lib/supabase';

type View = 'list' | 'add' | 'edit';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (currentView === 'list') {
      setSelectedEmployee(null);
    }
  }, [currentView]);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setCurrentView('edit');
  };

  const handleFormSuccess = () => {
    setCurrentView('list');
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Employee Management</h1>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              All Employees
            </button>
            <button
              onClick={() => setCurrentView('add')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'add' || currentView === 'edit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              {currentView === 'edit' ? 'Edit Employee' : 'Add Employee'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {currentView === 'list' ? (
            <EmployeeList onEdit={handleEdit} />
          ) : (
            <EmployeeForm
              employee={selectedEmployee}
              onSuccess={handleFormSuccess}
              onCancel={() => setCurrentView('list')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
