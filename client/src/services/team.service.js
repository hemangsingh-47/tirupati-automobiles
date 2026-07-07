import api from '../api/axiosConfig';

export const teamService = {
  getTeam: async (admin = false) => {
    const { data } = await api.get(`/team${admin ? '?admin=true' : ''}`);
    return data;
  },

  createTeamMember: async (formData) => {
    const { data } = await api.post('/team', formData);
    return data;
  },

  updateTeamMember: async (id, formData) => {
    const { data } = await api.patch(`/team/${id}`, formData);
    return data;
  },

  deleteTeamMember: async (id) => {
    const { data } = await api.delete(`/team/${id}`);
    return data;
  }
};
