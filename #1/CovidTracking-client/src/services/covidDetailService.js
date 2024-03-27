const baseUrl = 'https://localhost:7022/api/coviddetail';

const CovidDetailService = {
  getCovidDetailsByMemberId: async (memberId) => {
    try {
      const response = await fetch(`${baseUrl}/by-member/${memberId}`);
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to fetch COVID details');
    } catch (error) {
      console.error('CovidDetailService :: getCovidDetailsByMemberId :: ERROR :: ', error);
    }
  },
  create: async (covidDetail) => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(covidDetail),
      });
      if (!response.ok) {
        throw new Error('Failed to create COVID detail');
      }
      return response.ok;
    } catch (error) {
      console.error('CovidDetailService :: create :: ERROR :: ', error);
    }
  },
  update: async (covidDetails) => {
    try {
      const response = await fetch(`${baseUrl}/${covidDetails.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(covidDetails),
      });
      if (!response.ok) {
        throw new Error('Failed to update COVID details');
      }
      return response.ok;
    } catch (error) {
      console.error('CovidDetailService :: update :: ERROR :: ', error);
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
      console.error('CovidDetailService :: delete :: ERROR :: ', error);
    }
  },

  getActivePatientsCountLastMonth: async () => {
    try {
      const response = await fetch(`${baseUrl}/active-patients-count-last-month`);
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to fetch active patients count');
    } catch (error) {
      console.error('CovidDetailService :: getActivePatientsCountLastMonth :: ERROR :: ', error);
    }
  },
};

export default CovidDetailService;
