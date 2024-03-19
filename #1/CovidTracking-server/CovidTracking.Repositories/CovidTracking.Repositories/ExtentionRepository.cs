using CovidTracking.Repositories.Interfaces;
using CovidTracking.Repositories.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace CovidTracking.Repositories
{
    public static class ExtentionRepository
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IMemberRepository, MemberRepository>();
            services.AddScoped<IVaccinationRepository, VaccinationRepository>();
            services.AddScoped<ICovidDetailRepository, CovidDetailRepository>();
            return services;
        }
    }
}
