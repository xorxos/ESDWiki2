using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class FullWidthImageSection: ArticleItem
    {
        public string Name { get; set; }
        public string ImageSrc { get; set; }
        public int Width { get; set; }
        public string Placeholder { get; set; }
    }
}
