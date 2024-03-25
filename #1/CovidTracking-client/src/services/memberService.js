const baseUrl = 'https://localhost:7022/api/member';

const MemberService = {
  getAll: async () => {
    try {
      const response = await fetch(baseUrl);
      return response.json();
    } catch (e) {
      console.error('MemberService :: getAll :: ERROR :: ', error);
    }
  },
  getById: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`);
      return response.json();
    } catch (e) {
      console.error('MemberService :: getById :: ERROR :: ', error);
    }
  },
  create: async (member) => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: member,
      });
      return response;
    } catch (e) {
      console.error('MemberService :: create :: ERROR :: ', error);
    }
  },
  update: async (id, member) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        body: member,
      });
      return response;
    }
    catch (e) {
      console.error('MemberService :: update :: ERROR :: ', error);
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
      console.error('MemberService :: delete :: ERROR :: ', error);
    }
  },
};

export default MemberService;
