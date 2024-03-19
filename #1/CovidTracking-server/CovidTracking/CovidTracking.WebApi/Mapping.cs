using AutoMapper;
using CovidTracking.Repositories.Entities;
using CovidTracking.WebApi.Models;

namespace CovidTracking.WebApi
{
    public class Mapping: Profile
    {
        public Mapping()
        {
            CreateMap<Member, MemberModel>().ReverseMap();
            CreateMap<Vaccination, VaccinationModel>().ReverseMap();
            CreateMap<CovidDetail, CovidDetailModel>().ReverseMap();
            CreateMap<Address, AddressModel>().ReverseMap();
        }
    }
}
