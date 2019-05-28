using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class ListSection: ArticleItem
    {
        public ICollection<BulletItem> Contents { get; set; }
    }
}
