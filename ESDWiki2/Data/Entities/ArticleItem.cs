using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class ArticleItem
    {
        public int Id { get; set; }
        public string Selector { get; set; }
        public string DisplayName { get; set; }
        public bool Hovered { get; set; }
        public int TopSpacing { get; set; }
        public int BottomSpacing { get; set; }
        public int LeftSpacing { get; set; }
        public int ItemSpacing { get; set; }
    }
}
