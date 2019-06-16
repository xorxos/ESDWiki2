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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ESDWiki2.Controllers
{
    [Route("/api/accounts")]
    [ApiController]
    public class AccountsController : Controller
    {
        private readonly WikiContext _appDbContext;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<ApplicationUser> userManager, IMapper mapper, WikiContext appDbContext, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
            this.signInManager = signInManager;
        }

        // POST api/accounts
        [HttpPost, Route("register")]
        [Authorize(Policy = "WikiAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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

            return new OkObjectResult(true);
        }

        // POST api/accounts/:emailAddress
        [HttpPost("{email}")]
        [Authorize(Policy = "WikiAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Edit([FromBody]EditViewModel model, string email)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("ModelState is not valid");
                    return BadRequest(ModelState);
                }

                var user = await _userManager.FindByEmailAsync(email);
                if (user != null)
                {
                    user.Email = model.Email;
                    user.UserName = model.Email;
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.Team = model.Team;
                    user.Permissions = model.Permissions;

                    var result = await _userManager.UpdateAsync(user);
                    if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
                    return new OkObjectResult(true);
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest($"Failed to get users: {exception}");
            }
            return new OkObjectResult(true);
        }

        [HttpGet]
        [Authorize(Policy = "WikiAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
