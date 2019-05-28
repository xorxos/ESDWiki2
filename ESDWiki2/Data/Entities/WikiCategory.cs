using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ESDWiki2.Data.Entities
{
    public class WikiCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CategoryUrl { get; set; }  //category name with the spaces replaced with underscores. Ex.  Active Directory => active_directory
        public string ImageUrl { get; set; }
        public string ImagePlaceholder { get; set; } //default image
        public string ImageName { get; set; } //example.png
        public string ImagePath { get; set; } //database path to image
    }
}
