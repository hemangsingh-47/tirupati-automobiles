import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Check, X } from 'lucide-react';
import api from '../../../api/axiosConfig';
import { getUploadUrl } from '../../../utils/uploadUrl';

const TeamManager = () => {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    isActive: true,
    displayOrder: 0
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data } = await api.get('/team?admin=true');
      setTeam(data);
    } catch (error) {
      console.error('Failed to fetch team', error);
      alert('Failed to load team.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        experience: member.experience || '',
        isActive: member.isActive,
        displayOrder: member.displayOrder
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: '',
        experience: '',
        isActive: true,
        displayOrder: team.length
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingMember) {
        await api.patch(`/team/${editingMember._id}`, data);
      } else {
        await api.post('/team', data);
      }
      setIsModalOpen(false);
      fetchTeam();
    } catch (error) {
      alert('Failed to save team member');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await api.delete(`/team/${id}`);
        fetchTeam();
      } catch (error) {
        alert('Failed to delete member');
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await api.patch(`/team/${id}`, { isActive: !currentStatus });
      fetchTeam();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray">Loading Team...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Team CMS</h1>
          <p className="text-gray text-sm">Manage staff profiles displayed on the website.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-background font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {team.map((member) => (
          <div key={member._id} className="bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl group">
            <div className="aspect-[3/4] relative bg-background border-b border-white/5">
              {member.imageUrl ? (
                <img src={getUploadUrl(member.imageUrl)} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(member)} className="p-1.5 bg-background/80 backdrop-blur rounded text-white hover:text-primary">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(member._id)} className="p-1.5 bg-background/80 backdrop-blur rounded text-white hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </div>
              </div>
              <p className="text-gray text-xs mb-4">{member.experience}</p>
              
              <button 
                onClick={() => toggleActive(member._id, member.isActive)}
                className={`w-full flex items-center justify-center gap-2 text-xs font-bold px-3 py-2 rounded-lg border transition-colors ${
                  member.isActive ? 'text-green-500 border-green-500/30 bg-green-500/10 hover:bg-green-500/20' : 'text-gray border-white/20 hover:bg-white/5'
                }`}
              >
                {member.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                {member.isActive ? 'Profile Visible' : 'Profile Hidden'}
              </button>
            </div>
          </div>
        ))}
        {team.length === 0 && (
          <div className="col-span-full p-12 text-center border border-white/5 rounded-2xl bg-surface">
            <p className="text-gray">No team members added yet.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-surface border border-white/10 rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative my-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold font-heading text-white mb-6">
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Full Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Role / Title</label>
                <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Experience (e.g. 10+ Years)</label>
                <input type="text" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray mb-1">Profile Photo</label>
                <div className="flex items-center gap-4">
                  {(imageFile || editingMember?.imageUrl) && (
                    <div className="w-16 h-16 rounded-lg bg-background border border-white/10 overflow-hidden shrink-0">
                      <img src={imageFile ? URL.createObjectURL(imageFile) : getUploadUrl(editingMember.imageUrl)} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={e => setImageFile(e.target.files[0])} className="text-sm text-gray file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-background hover:file:bg-yellow-500 cursor-pointer" accept="image/*" />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded bg-background border-white/10 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray">Active Profile (Visible)</span>
                </label>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-white/10 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg font-medium text-white bg-white/5 hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-lg font-bold text-background bg-primary hover:bg-yellow-500 transition-colors">
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;
