using CovidTracking.Repositories.Entities;
using CovidTracking.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Repositories.Repositories
{
    public class VaccinationRepository : IVaccinationRepository
    {
        private readonly MyDbContext _context;
        private readonly IMemberRepository _memberRepository;
        private const int MaxVaccination = 4;
        public VaccinationRepository(MyDbContext icontext,IMemberRepository memberRepository)
        {
            _context = icontext;
            _memberRepository = memberRepository;
        }
        public async Task<Vaccination> AddAsync(Vaccination vaccination)
        {
            int vaccinationCount = _context.Vaccinations.Count(vaccination => vaccination.MemberId == vaccination.MemberId);
            if (vaccinationCount < MaxVaccination)
            {
                _context.Vaccinations.AddAsync(vaccination);
                await _context.SaveChangesAsync();
                return vaccination;
            }
            return null;
        }

        public async Task DeleteAsync(int id)
        {
            _context.Vaccinations.Remove(await GetByIdAsync(id));
            await _context.SaveChangesAsync();
        }

        public async Task<List<Vaccination>> GetAllAsync()
        {
            return await _context.Vaccinations.ToListAsync();
        }

        public async Task<Vaccination> GetByIdAsync(int id)
        {
            return await _context.Vaccinations.FindAsync(id);
        }
        public async Task<List<Vaccination>> GetByMemberIdAsync(int memberId)
        {
            return await _context.Vaccinations
                .Where(vaccination => vaccination.MemberId == memberId)
                .ToListAsync();
        }

        public async Task<Vaccination> UpdateAsync(Vaccination vaccination)
        {
            var updatedVaccination = await GetByIdAsync(vaccination.Id);

            updatedVaccination.MemberId = vaccination.MemberId;
            updatedVaccination.Manufacturer = vaccination.Manufacturer;
            updatedVaccination.ReciveTime = vaccination.ReciveTime;
         
            await _context.SaveChangesAsync();
            return updatedVaccination;
        }
        public async Task<int> NotVaccinated()
        {
            return await _context.Members.CountAsync() - await _context.Vaccinations.GroupBy(member => member.MemberId).CountAsync();
        }
        public async Task<int> GetNotVaccinatedCountAsync()
        {
            int vaccinatedMembersCount = await _context.Vaccinations
                .Select(v => v.MemberId)
                .Distinct()
                .CountAsync();

            int totalMembersCount = await _context.Members.CountAsync();

            return totalMembersCount - vaccinatedMembersCount;
        }
    }
}
