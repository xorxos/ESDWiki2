using ESDWiki2.Data.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ESDWiki2.Data
{
    public class Article
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<ArticleItem> ArticleItems { get; set; }
        public ICollection<WikiCategoryItem> WikiCategories { get; set; }
        public ICollection<TeamCategoryItem> TeamCategories { get; set; }
        public ApplicationUser User { get; set; }
        public ApplicationUser LastUpdateUser { get; set; }
    }
}