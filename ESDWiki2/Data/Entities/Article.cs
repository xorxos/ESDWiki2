﻿using ESDWiki2.Data.Entities;
using System.Collections.Generic;

namespace ESDWiki2.Data
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<ArticleItem> ArticleItems { get; set; }
        public ICollection<Category> Categories { get; set; }
        public WikiUser User { get; set; }
        public WikiUser LastUpdateUser { get; set; }
    }
}