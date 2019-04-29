
using ESDWiki2.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace ESDWiki2.Data
{
    public class WikiSeeder
    {
        private readonly WikiContext _ctx;
        private readonly IHostingEnvironment _hosting;
        private readonly UserManager<ApplicationUser> userManager;

        public WikiSeeder(WikiContext ctx, IHostingEnvironment hosting, UserManager<ApplicationUser> userManager)
        {
            _ctx = ctx;
            _hosting = hosting;
            this.userManager = userManager;
        }

        public async Task SeedAsync()
        {
            _ctx.Database.EnsureCreated();

            ApplicationUser user = await userManager.FindByEmailAsync("parkertleavitt@gmail.com");

            if (user == null)
            {
                user = new ApplicationUser()
                {
                    FirstName = "Parker",
                    LastName = "Leavitt",
                    Email = "parkertleavitt@gmail.com",
                    UserName = "parkertleavitt@gmail.com",
                    Team = "ESD",
                    IsWikiAdmin = true
                };

                var result = await userManager.CreateAsync(user, "P@ssw0rd!");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create new user in seeder");
                }
            }

            /** if (!_ctx.Products.Any())
            {
                _ctx.SaveChanges();
            } **/
        }
    }
}
