using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.ViewModels
{
    public class EditViewModel
    {
        public string OriginalEmail { get; set; }
        public string Email { get; set; }
        public string Team { get; set; }
        public string Permissions { get; set; }
    }
}
