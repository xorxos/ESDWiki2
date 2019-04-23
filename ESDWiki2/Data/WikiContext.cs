using ESDWiki2.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ESDWiki2.Data
{
    public class WikiContext : IdentityDbContext<WikiUser>
    {
        public WikiContext(DbContextOptions<WikiContext> options) : base(options)
        {

        }

        public DbSet<ESDTeamUser> ESDTeamUsers { get; set; }
        public DbSet<Article> Articles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
