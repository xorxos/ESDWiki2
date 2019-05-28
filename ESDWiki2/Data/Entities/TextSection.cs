using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class TextSection: ArticleItem
    {
        public string Contents { get; set; }
        public int LeftSpacing { get; set; }
        public int TopSpacing { get; set; }
    }
}
