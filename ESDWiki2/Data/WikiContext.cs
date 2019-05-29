using ESDWiki2.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ESDWiki2.Data
{
    public class WikiContext : IdentityDbContext<ApplicationUser>
    {
        public WikiContext(DbContextOptions<WikiContext> options) : base(options)
        {

        }

        public DbSet<WikiCategory> WikiCategories { get; set; }
        public DbSet<TeamCategory> TeamCategories { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ArticleItem> ArticleItems { get; set; }
        public DbSet<Article> Articles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
