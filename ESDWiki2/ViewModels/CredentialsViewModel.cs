using ESDWiki2.ViewModels.Validations;
using FluentValidation.Attributes;

namespace ESDWiki2.ViewModels
{
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
