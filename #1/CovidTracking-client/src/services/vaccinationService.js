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

  create: async (vaccination) => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vaccination),
      });
      if (!response.ok) {
        throw new Error('Failed to create vaccination');
      }
      return response.ok;

    } catch (error) {
      console.error('VaccinationService :: create :: ERROR :: ', error);
    }
  },
  update: async (vaccination) => {
    try {
      const response = await fetch(`${baseUrl}/${vaccination.id}`, {
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
  delete: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    }
    catch (e) {
      console.error('VaccinationService :: delete :: ERROR :: ', error);
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

