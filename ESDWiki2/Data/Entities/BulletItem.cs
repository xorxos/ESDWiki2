using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class BulletItem
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public string BulletContents { get; set; }
    }
}
