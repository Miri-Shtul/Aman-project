const baseUrl = 'https://localhost:7022/api/coviddetail';

const CovidDetailService = {
    async getCovidDetailsByMemberId(memberId) {
        const response = await fetch(`${baseUrl}/by-member/${memberId}`);
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to fetch COVID details');
    },
    async update(id, covidDetails) {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(covidDetails),
        });
        return response.ok;
    },
    async getActivePatientsCountLastMonth() {
        const response = await fetch(`${baseUrl}/active-patients-count-last-month`);
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to fetch active patients count');
    },
};

export default CovidDetailService;
