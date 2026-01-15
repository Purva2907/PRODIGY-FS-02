import { supabase, Employee, EmployeeFormData } from '../lib/supabase';

export const employeeService = {
  async getAllEmployees(): Promise<{ data: Employee[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getEmployeeById(id: string): Promise<{ data: Employee | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async createEmployee(employeeData: EmployeeFormData): Promise<{ data: Employee | null; error: Error | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('employees')
        .insert([{ ...employeeData, created_by: user.id }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updateEmployee(id: string, employeeData: Partial<EmployeeFormData>): Promise<{ data: Employee | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .update(employeeData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async deleteEmployee(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  async searchEmployees(query: string): Promise<{ data: Employee[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .or(`name.ilike.%${query}%,email.ilike.%${query}%,employee_id.ilike.%${query}%,department.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
};
