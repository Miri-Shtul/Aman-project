using CovidTracking.Repositories.Entities;
using CovidTracking.Repositories.Interfaces;
using CovidTracking.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Services.Services
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _memberRepository;
        private readonly IVaccinationRepository _vaccinationRepository;

        public MemberService(IMemberRepository memberRepository, IVaccinationRepository vaccinationRepository)
        {
            _memberRepository = memberRepository;
            _vaccinationRepository = vaccinationRepository;
        }

        public Task<Member> AddAsync(Member member)
        {
            return _memberRepository.AddAsync(member);
        }

        public Task DeleteAsync(int id)
        {
            return _memberRepository.DeleteAsync(id);
        }

        public Task<List<Member>> GetAllAsync()
        {
            return _memberRepository.GetAllAsync();
        }

        public Task<Member> GetByIdAsync(int id)
        {
            return _memberRepository.GetByIdAsync(id);
        }

        public Task<Member> GetByIdentityNumberAsyc(string identityNumber)
        {
            return _memberRepository.GetByIdentityNumberAsyc(identityNumber);
        }

        public Task<int> GetNotVaccinatedCountAsync()
        {
            return _vaccinationRepository.GetNotVaccinatedCountAsync();
        }

        public Task<Member> UpdateAsync(Member member)
        {
            return _memberRepository.UpdateAsync(member);
        }
    }
}
