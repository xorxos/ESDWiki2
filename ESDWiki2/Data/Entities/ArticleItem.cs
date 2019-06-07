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
        public int Position { get; set; }
        public bool Hovered { get; set; }
        public int TopSpacing { get; set; }
        public int BottomSpacing { get; set; }
        public int LeftSpacing { get; set; }
        public int ItemSpacing { get; set; }
        public string Name { get; set; }
        public string ImageSrc { get; set; }
        public int Width { get; set; }
        public string Placeholder { get; set; }
        public ICollection<BulletItem> ListContents { get; set; }
        public string TitleContents { get; set; }
        public string TextContents { get; set; }
        public string SubheaderContents { get; set; }
    }
}
