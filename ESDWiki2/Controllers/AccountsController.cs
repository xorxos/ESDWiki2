using Microsoft.AspNetCore.Mvc;
using ESDWiki2.ViewModels;
using AutoMapper;
using ESDWiki2.Data.Entities;
using Microsoft.AspNetCore.Identity;
using ESDWiki2.Helpers;
using System.Threading.Tasks;
using ESDWiki2.Data;

namespace ESDWiki2.Controllers
{
    [Route("/api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly WikiContext _appDbContext;
        private readonly UserManager<WikiUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<WikiUser> userManager, IMapper mapper, WikiContext appDbContext)
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
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<WikiUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.ESDTeamUsers.AddAsync(new ESDTeamUser { IdentityId = userIdentity.Id, Team = model.Team });
            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }
    }
}
