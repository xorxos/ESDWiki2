

namespace ESDWiki2.ViewModels
{
    public class RegistrationViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Team { get; set; }
        public bool IsWikiUser { get; set; }
        public bool IsWikiAdmin { get; set; }
        public bool IsESDTeamMember { get; set; }
        public bool IsESDTeamAdmin { get; set; }
    }
}
