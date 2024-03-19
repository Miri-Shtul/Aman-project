using CovidTracking.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Repositories.Interfaces
{
    public interface IContext
    {
        DbSet<Member> Members { get; set; }
        DbSet<Vaccination> Vaccinations { get; set; }
        DbSet<CovidDetail> CovidDetails { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
