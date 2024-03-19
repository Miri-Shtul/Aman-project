using CovidTracking.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Repositories.Interfaces
{
    public interface IVaccinationRepository
    {
        Task<List<Vaccination>> GetAllAsync();
        Task<Vaccination> GetByIdAsync(int id);
        Task<List<Vaccination>> GetByMemberIdAsync(int memberId);
        Task<Vaccination> AddAsync(Vaccination vaccination);
        Task<Vaccination> UpdateAsync(Vaccination vaccination);
        Task DeleteAsync(int id);
        Task<int> GetNotVaccinatedCountAsync();
    }
}
