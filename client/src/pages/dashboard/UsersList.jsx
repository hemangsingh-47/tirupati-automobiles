import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Shield, User as UserIcon, Edit2, CheckCircle, XCircle } from 'lucide-react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const UsersList = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff');
  const [isActive, setIsActive] = useState(true);
  
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setEditingUserId(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('staff');
    setIsActive(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setEditingUserId(user._id);
    setName(user.name);
    setEmail(user.email);
    setPassword(''); // don't show existing password
    setRole(user.role);
    setIsActive(user.isActive !== false); // default to true if undefined
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);
    
    try {
      if (isEditMode) {
        // Edit User
        const payload = { role, isActive };
        // We only allow updating role and active status in this basic edit
        const { data } = await api.patch(`/users/${editingUserId}`, payload);
        setUsers(users.map(u => u._id === editingUserId ? { ...u, ...data } : u));
      } else {
        // Create User
        const { data } = await api.post('/users', { name, email, password, role });
        setUsers([...users, data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      setFormError(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} user`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Staff Management</h1>
          <p className="text-gray text-sm">Manage workshop administrators and mechanics.</p>
        </div>
        
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">User</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">Role</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                          <UserIcon className="w-5 h-5 text-gray" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {user.role === 'admin' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                          <Shield className="w-3 h-3 mr-1" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          Staff
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {user.isActive !== false ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          <CheckCircle className="w-3 h-3 mr-1" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray border border-gray-500/20">
                          <XCircle className="w-3 h-3 mr-1" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {currentUser._id !== user._id && (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(user)}
                            className="inline-flex items-center justify-center p-2 text-gray hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user._id)}
                            className="inline-flex items-center justify-center p-2 text-gray hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  {isEditMode ? 'Edit Staff Member' : 'Add New Staff'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {formError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required={!isEditMode}
                      disabled={isEditMode}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required={!isEditMode}
                      disabled={isEditMode}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none disabled:opacity-50"
                    />
                  </div>
                  
                  {!isEditMode && (
                    <div>
                      <label className="block text-sm text-gray mb-1">Password</label>
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray mb-1">Role</label>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                    >
                      <option value="staff">Staff (Mechanic / Service Advisor)</option>
                      <option value="admin">Admin (Full Access)</option>
                    </select>
                  </div>

                  {isEditMode && (
                    <div>
                      <label className="block text-sm text-gray mb-1">Account Status</label>
                      <select 
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value === 'true')}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                      >
                        <option value="true">Active (Can log in)</option>
                        <option value="false">Inactive (Suspended)</option>
                      </select>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-background font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors mt-6 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Account'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UsersList;
