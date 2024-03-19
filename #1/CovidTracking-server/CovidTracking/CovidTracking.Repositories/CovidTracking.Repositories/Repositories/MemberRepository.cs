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
    public class MemberRepository : IMemberRepository
    {
        private readonly MyDbContext _context;
        public MemberRepository(MyDbContext icontext)
        {
            _context = icontext;
        }
        public async Task<Member> AddAsync(Member member)
        {
            var newUser = _context.Members.Add(member);
            await _context.SaveChangesAsync();
            return newUser.Entity;
        }

        public async Task DeleteAsync(int id)
        {
            _context.Members.Remove(await GetByIdAsync(id));
            await _context.SaveChangesAsync();
        }

        public async Task<List<Member>> GetAllAsync()
        {
            return await _context.Members.ToListAsync();
        }

        public async Task<Member> GetByIdAsync(int id)
        {
            return await _context.Members.FindAsync(id);
        }

        public async Task<Member> GetByIdentityNumberAsyc(string identityNumber)
        {
            return await _context.Members.FirstOrDefaultAsync(member => member.IdentityNumber == identityNumber);
        }


        public async Task<Member> UpdateAsync(Member member)
        {
            var updatedUser = await GetByIdAsync(member.Id);
            updatedUser.FirstName = member.FirstName;
            updatedUser.LastName = member.LastName;
            updatedUser.IdentityNumber = member.IdentityNumber;
            updatedUser.Address = member.Address;
            updatedUser.DateOfBirth = member.DateOfBirth;
            updatedUser.DateOfBirth = member.DateOfBirth;
            updatedUser.Phone = member.Phone;
            updatedUser.MobilePhone = member.MobilePhone;
            await _context.SaveChangesAsync();
            return updatedUser;
        }
    }
}
