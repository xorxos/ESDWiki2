using ESDWiki2.Data.Entities;
using AutoMapper;
using ESDWiki2.ViewModels;

namespace AngularASPNETCore2WebApiAuth.ViewModels.Mappings
{
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, WikiUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}
