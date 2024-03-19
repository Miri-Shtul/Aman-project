using CovidTracking.Repositories.Entities;
using CovidTracking.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Services.Services
{
    public class CovidDetailService : ICovidDetailService
    {

        private readonly ICovidDetailRepository _covidDetailRepository;
        public CovidDetailService(ICovidDetailRepository covidDetailRepository)
        {
            _covidDetailRepository = covidDetailRepository;
        }
        public Task<CovidDetail> AddAsync(CovidDetail covidDetail)
        {
            return _covidDetailRepository.AddAsync(covidDetail);
        }

        public Task DeleteAsync(int id)
        {
          return _covidDetailRepository.DeleteAsync(id);
        }

        public Task<List<ActivePatientsCountModel>> GetActivePatientsCountLastMonthAsync()
        {
           return _covidDetailRepository.GetActivePatientsCountLastMonthAsync();
        }

        public Task<List<CovidDetail>> GetAllAsync()
        {
           return _covidDetailRepository.GetAllAsync();
        }

        public Task<CovidDetail> GetByIdAsync(int id)
        {
           return _covidDetailRepository.GetByIdAsync(id);
        }

        public Task<List<CovidDetail>> GetByMemberIdAsync(int memberId)
        {
           return _covidDetailRepository.GetByMemberIdAsync(memberId);
        }

        public Task<CovidDetail> UpdateAsync(CovidDetail covidDetail)
        {
            return _covidDetailRepository.UpdateAsync(covidDetail);
        }
    }
}
