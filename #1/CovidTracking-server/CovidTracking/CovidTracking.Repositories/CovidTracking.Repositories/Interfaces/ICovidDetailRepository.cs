using CovidTracking.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Repositories.Interfaces
{
    public interface ICovidDetailRepository
    {
        Task<List<CovidDetail>> GetAllAsync();
        Task<CovidDetail> GetByIdAsync(int id);
        Task<CovidDetail> AddAsync(CovidDetail covidDetail);
        Task<List<CovidDetail>> GetByMemberIdAsync(int memberId);
        Task<CovidDetail> UpdateAsync(CovidDetail covidDetail);
        Task DeleteAsync(int id);
        Task<List<ActivePatientsCountModel>> GetActivePatientsCountLastMonthAsync();
    }
}
