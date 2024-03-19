using CovidTracking.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Services.Services
{
    public interface ICovidDetailService
    {
        Task<List<CovidDetail>> GetAllAsync();
        Task<CovidDetail> GetByIdAsync(int id);
        Task<List<CovidDetail>> GetByMemberIdAsync(int memberId);
        Task<CovidDetail> AddAsync(CovidDetail covidDetail);
        Task<CovidDetail> UpdateAsync(CovidDetail covidDetail);
        Task DeleteAsync(int id);
        Task<List<ActivePatientsCountModel>> GetActivePatientsCountLastMonthAsync();
    }
}
