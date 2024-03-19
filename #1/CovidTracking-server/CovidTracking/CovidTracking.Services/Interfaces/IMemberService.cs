using CovidTracking.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Services.Services
{
    public interface IMemberService
    {
        Task<List<Member>> GetAllAsync();
        Task<Member> GetByIdentityNumberAsyc(string identityNumber);
        Task<Member> GetByIdAsync(int identityNumber);
        Task<Member> AddAsync(Member member);
        Task<Member> UpdateAsync(Member member);
        Task DeleteAsync(int id);
        Task<int> GetNotVaccinatedCountAsync();
    }
}
