const baseUrl = 'https://localhost:7022/api/vaccination';

const VaccinationService = {
  async getVaccinationsByMemberId(memberId) {
    const response = await fetch(`${baseUrl}/by-member/${memberId}`);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch vaccinations');
  },
  async update(id, vaccination){
        const response = await fetch(`${baseUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vaccination),
        });
        return response.ok;
  },
  async getNotVaccinatedMembersCount() {
    const response = await fetch(`${baseUrl}/not-vaccinated-members-count`);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch not vaccinated members count');
  },
};

export default VaccinationService;
