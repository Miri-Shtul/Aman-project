using CovidTracking.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Repositories.Entities
{
    public class MyDbContext : DbContext, IContext
    {
        public DbSet<Member> Members { get; set; }
        public DbSet<Vaccination> Vaccinations { get; set; }
        public DbSet<CovidDetail> CovidDetails { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=CovidTracking;Trusted_Connection=True;");

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Member>(entity =>
            {
                entity.OwnsOne(e => e.Address);
            });
        }
    }
}
