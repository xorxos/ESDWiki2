
using ESDWiki2.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESDWiki2.Data
{
    public class WikiSeeder
    {
        private readonly WikiContext _ctx;
        private readonly IHostingEnvironment _hosting;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IWikiRepository repository;

        public WikiSeeder(WikiContext ctx, IHostingEnvironment hosting, UserManager<ApplicationUser> userManager, IWikiRepository repository)
        {
            _ctx = ctx;
            _hosting = hosting;
            this.userManager = userManager;
            this.repository = repository;
        }

        public async Task SeedAsync()
        {
            _ctx.Database.EnsureCreated();

            IEnumerable<WikiCategory> initialWikiCategories = new List<WikiCategory>()
            {
                new WikiCategory()
                {
                    Name = "Email",
                    CategoryUrl = "email",
                    ImageUrl = "images/microsoft-outlook-96.png"
                },
                new WikiCategory()
                {
                    Name = "VPN",
                    CategoryUrl = "vpn",
                    ImageUrl = "images/pulse-secure-small.png"
                },
                new WikiCategory()
                {
                    Name = "Internet",
                    CategoryUrl = "internet",
                    ImageUrl = "images/wifi-96.png"
                },
                new WikiCategory()
                {
                    Name = "Skype",
                    CategoryUrl = "skype",
                    ImageUrl = "images/skype-96.png"
                },
                new WikiCategory()
                {
                    Name = "Lockouts",
                    CategoryUrl = "lockouts",
                    ImageUrl = "images/password-96.png"
                },
                new WikiCategory()
                {
                    Name = "Microsoft Office",
                    CategoryUrl = "microsoft_office",
                    ImageUrl = "images/office-96.png"
                },
                new WikiCategory()
                {
                    Name = "Adobe",
                    CategoryUrl = "adobe",
                    ImageUrl = "images/adobe-creative-cloud-96.png"
                },
                new WikiCategory()
                {
                    Name = "Antivirus",
                    CategoryUrl = "antivirus",
                    ImageUrl = "images/symantec-96.png"
                },
                new WikiCategory()
                {
                    Name = "Mobile Devices",
                    CategoryUrl = "mobile_devices",
                    ImageUrl = "images/smartphone-tablet-filled-100.png"
                },
                new WikiCategory()
                {
                    Name = "Fiori",
                    CategoryUrl = "fiori",
                    ImageUrl = "images/sap-96.png"
                },
                new WikiCategory()
                {
                    Name = "Browser Issues",
                    CategoryUrl = "browser_issues",
                    ImageUrl = "images/chrome-96.png"
                },
                new WikiCategory()
                {
                    Name = "Windows",
                    CategoryUrl = "windows",
                    ImageUrl = "images/windows-10-96.png"
                },
                new WikiCategory()
                {
                    Name = "Mac",
                    CategoryUrl = "mac",
                    ImageUrl = "images/mac-client-96.png"
                }
            };

            IEnumerable<TeamCategory> initialTeamCategories = new List<TeamCategory>()
            {
                new TeamCategory()
                {
                    Name = "Active Directory",
                    CategoryUrl = "active_directory",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Profile Manager",
                    CategoryUrl = "profile_manager",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Exchange",
                    CategoryUrl = "exchange",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Outlook",
                    CategoryUrl = "outlook",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Pulse Secure",
                    CategoryUrl = "pulse_secure",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Microsoft MFA",
                    CategoryUrl = "microsoft_mfa",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Duo Mobile",
                    CategoryUrl = "duo_mobile",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Egnyte",
                    CategoryUrl = "egnyte",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Splunk",
                    CategoryUrl = "splunk",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "OpenText",
                    CategoryUrl = "opentext",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "OpenPages",
                    CategoryUrl = "openpages",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Symantec",
                    CategoryUrl = "symantec",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Password Resets",
                    CategoryUrl = "password_resets",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Account Lockouts",
                    CategoryUrl = "account_lockouts",
                    ImageUrl = ""
                },
                new TeamCategory()
                {
                    Name = "Modern Authentication",
                    CategoryUrl = "modern_authentication",
                    ImageUrl = ""
                }
            };

            if (!_ctx.WikiCategories.Any())
            {
                _ctx.WikiCategories.AddRange(initialWikiCategories);
            }

            if(!_ctx.TeamCategories.Any())
            {
                _ctx.TeamCategories.AddRange(initialTeamCategories);
            }

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
                    Permissions = "Wiki Admin"
                };

                var result = await userManager.CreateAsync(user, "P@ssw0rd!");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create new user in seeder");
                }
            }

            user = await userManager.FindByEmailAsync("parkertleavitt2@gmail.com");

            if (user == null)
            {
                user = new ApplicationUser()
                {
                    FirstName = "Parker",
                    LastName = "Leavitt",
                    Email = "parkertleavitt2@gmail.com",
                    UserName = "parkertleavitt2@gmail.com",
                    Team = "ESD",
                    Permissions = "Default User"
                };

                var result = await userManager.CreateAsync(user, "P@ssw0rd!");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create new user in seeder");
                }
            }

            user = await userManager.FindByEmailAsync("parkertleavitt3@gmail.com");

            if (user == null)
            {
                user = new ApplicationUser()
                {
                    FirstName = "Parker",
                    LastName = "Leavitt",
                    Email = "parkertleavitt3@gmail.com",
                    UserName = "parkertleavitt3@gmail.com",
                    Team = "ESD",
                    Permissions = "ESD Member"
                };

                var result = await userManager.CreateAsync(user, "P@ssw0rd!");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create new user in seeder");
                }
            }

            user = await userManager.FindByEmailAsync("parkertleavitt4@gmail.com");

            if (user == null)
            {
                user = new ApplicationUser()
                {
                    FirstName = "Parker",
                    LastName = "Leavitt",
                    Email = "parkertleavitt4@gmail.com",
                    UserName = "parkertleavitt4@gmail.com",
                    Team = "ESD",
                    Permissions = "ESD Admin"
                };

                var result = await userManager.CreateAsync(user, "P@ssw0rd!");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create new user in seeder");
                }
            }

            _ctx.SaveChanges();
        }
    }
}
