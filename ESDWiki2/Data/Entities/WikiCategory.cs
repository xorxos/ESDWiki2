using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class WikiCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CategoryUrl { get; set; }
        public string ImageUrl { get; set; }
    }
}
