using Microsoft.AspNetCore.Mvc;
using ESDWiki2.ViewModels;
using AutoMapper;
using ESDWiki2.Data.Entities;
using Microsoft.AspNetCore.Identity;
using ESDWiki2.Helpers;
using System.Threading.Tasks;
using ESDWiki2.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ESDWiki2.Controllers
{
    [Route("/api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly WikiContext _appDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<ApplicationUser> userManager, IMapper mapper, WikiContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState is not valid");
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<ApplicationUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.ApplicationUsers.AddAsync(new ApplicationUser { IdentityId = userIdentity.Id, Team = model.Team });
            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(true);
        }

        [HttpGet]
        public ActionResult<IEnumerable<ApplicationUser>> Get([FromQuery]string searchTerm, [FromQuery]string filter)
        {
            try
            {
                Console.WriteLine($"SearchTerm:  {searchTerm}. Filter:  {filter}");
                if (filter == "Email")
                {
                    return Ok(_appDbContext.Users.Where(u => u.UserName.Contains(searchTerm)).ToList());
                }
                else if (filter == "Firstname")
                {
                    return Ok(_appDbContext.Users.Where(u => u.FirstName.Contains(searchTerm)).ToList());
                }
                else if (filter == "Lastname")
                {
                    return Ok(_appDbContext.Users.Where(u => u.LastName.Contains(searchTerm)).ToList());
                }
                else if (filter == "Team")
                {
                    return Ok(_appDbContext.Users.Where(u => u.Team.Contains(searchTerm)).ToList());
                }
                else return BadRequest("Failed to get users");
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest($"Failed to get users: {exception}");
            }
        }
    }
}
