import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Delete Employee
        </h3>

        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete this employee? This action cannot be undone.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
