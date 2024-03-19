using CovidTracking.Repositories.Interfaces;
using CovidTracking.Repositories.Repositories;
using CovidTracking.Services.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CovidTracking.Services
{
    public static class ExtentionServices
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IMemberService, MemberService>();
            services.AddScoped<IVaccinationService, VaccinationService>();
            services.AddScoped<ICovidDetailService, CovidDetailService>();
            return services;
        }
    }
}
