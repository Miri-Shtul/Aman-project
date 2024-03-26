const baseUrl = 'https://localhost:7022/api/vaccination';

const VaccinationService = {
  getVaccinationsByMemberId: async (memberId) => {
    try {
      const response = await fetch(`${baseUrl}/by-member/${memberId}`);
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to fetch vaccinations');
    } catch (error) {
      console.error('VaccinationService :: getVaccinationsByMemberId :: ERROR :: ', error);
    }
  },

  update: async (id, vaccination) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vaccination),
      });
      if (!response.ok) {
        throw new Error('Failed to update vaccination');
      }
      return response.ok;
    } catch (error) {
      console.error('VaccinationService :: update :: ERROR :: ', error);
    }
  },

  getNotVaccinatedMembersCount: async () => {
    try {
      const response = await fetch(`${baseUrl}/not-vaccinated-members-count`);
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to fetch not vaccinated members count');
    } catch (error) {
      console.error('VaccinationService :: getNotVaccinatedMembersCount :: ERROR :: ', error);
    }
  },
};

export default VaccinationService;

