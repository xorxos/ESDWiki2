using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class ESDTeamUser
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public WikiUser Identity { get; set; }  //navigation property
        public string Team { get; set; }
    }
}
