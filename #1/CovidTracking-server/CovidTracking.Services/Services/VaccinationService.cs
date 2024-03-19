using CovidTracking.Repositories.Entities;
using CovidTracking.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Services.Services
{
    public class VaccinationService : IVaccinationService
    {
        private readonly IVaccinationRepository _vaccinationrepository;
        public VaccinationService(IVaccinationRepository vaccinationrepository)
        {
            _vaccinationrepository = vaccinationrepository;
        }

        public Task<Vaccination> AddAsync(Vaccination vaccination )
        {
            return _vaccinationrepository.AddAsync(vaccination);
        }

        public Task DeleteAsync(int id)
        {
           return _vaccinationrepository.DeleteAsync(id);
        }

        public Task<List<Vaccination>> GetAllAsync()
        {
            return _vaccinationrepository.GetAllAsync();
        }

        public Task<Vaccination> GetByIdAsync(int id)
        {
           return _vaccinationrepository.GetByIdAsync(id);
        }

        public Task<List<Vaccination>> GetByMemberIdAsync(int memberId)
        {
           return _vaccinationrepository.GetByMemberIdAsync(memberId);
        }

        public Task<int> GetNotVaccinatedCountAsync()
        {
            return _vaccinationrepository.GetNotVaccinatedCountAsync();  
        }

        public Task<Vaccination> UpdateAsync(Vaccination vaccination)
        {
           return _vaccinationrepository.UpdateAsync(vaccination);
        }
    }
}
