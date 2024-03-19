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
    public class CovidDetailRepository : ICovidDetailRepository
    {
        private readonly MyDbContext _context;
        private readonly IMemberRepository _memberRepository;
        public CovidDetailRepository(MyDbContext icontext, IMemberRepository memberRepository)
        {
            _context = icontext;
            _memberRepository = memberRepository;
        }
        public async Task<CovidDetail> AddAsync(CovidDetail covidDetail)
        {
            var member = await  _memberRepository.GetByIdAsync(covidDetail.MemberId);
            if (member == null)
            {
                throw new ArgumentException("Member with the provided identity number does not exist.");
            }
            covidDetail.MemberId = member.Id;
            _context.CovidDetails.Add(covidDetail);
            await _context.SaveChangesAsync();
            return covidDetail;
        }

        public async Task DeleteAsync(int id)
        {
            _context.CovidDetails.Remove(await GetByIdAsync(id));
            await _context.SaveChangesAsync();
        }

        public async Task<List<CovidDetail>> GetAllAsync()
        {
            return await _context.CovidDetails.ToListAsync();
        }

        public async Task<CovidDetail> GetByIdAsync(int id)
        {
            return await _context.CovidDetails.FindAsync(id);
        }
        public async Task<List<CovidDetail>> GetByMemberIdAsync(int memberId)
        {
            return await _context.CovidDetails
                .Where(covidDetail => covidDetail.MemberId == memberId)
                .ToListAsync();
        }

        public async Task<CovidDetail> UpdateAsync(CovidDetail covidDetails)
        {
            var updatedCovidDetails = await GetByIdAsync(covidDetails.Id);
           
            updatedCovidDetails.RecoveryDate = covidDetails.RecoveryDate;
            updatedCovidDetails.MemberId= covidDetails.MemberId;
            updatedCovidDetails.positiveResultDate = covidDetails.positiveResultDate;
            await _context.SaveChangesAsync();
            return updatedCovidDetails;
        }
        public async Task<int> ActivePatient()
        {
            return await _context.CovidDetails.CountAsync(p => p.RecoveryDate.Month == DateTime.Now.Month);
        }
        public async Task<List<ActivePatientsCountModel>> GetActivePatientsCountLastMonthAsync()
        {
            DateTime endDate = DateTime.Today.AddDays(1); 
            DateTime startDate = endDate.AddDays(-31);

            var allDates = Enumerable.Range(0, 31) 
                .Select(offset => startDate.AddDays(offset))
                .ToList();

            var positiveResults = await _context.CovidDetails
                .Where(cd => cd.positiveResultDate >= startDate && cd.positiveResultDate < endDate) 
                .ToListAsync();

            var activePatientsCount = allDates
                .GroupJoin(
                    positiveResults,
                    date => date,
                    cd => cd.positiveResultDate.Date,
                    (date, cds) => new ActivePatientsCountModel
                    {
                        Date = date,
                        ActivePatientsCount = cds.Count()
                    }
                )
                .OrderBy(model => model.Date)
                .ToList();

            return activePatientsCount;
        }
    }
}
