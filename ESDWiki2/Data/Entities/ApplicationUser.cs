using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentityId { get; set; }
        public string Team { get; set; }
        public bool IsWikiUser { get; set; }
        public bool IsWikiAdmin { get; set; }
        public bool IsESDTeamMember { get; set; }
        public bool IsESDTeamAdmin { get; set; }
        
    }
}
