const baseUrl = 'https://localhost:7022/api/member';

const MemberService = {
  getAll: async () => {
    const response = await fetch(baseUrl);
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${baseUrl}/${id}`);
    return response.json();
  },
  create: async (member) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });
    return response.json();
  },
  update: async (id, member) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });
    return response.ok;
  },
  delete: async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },
};

export default MemberService;
