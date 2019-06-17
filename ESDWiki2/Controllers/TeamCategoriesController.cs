using ESDWiki2.Data;
using ESDWiki2.Data.Entities;
using ESDWiki2.Helpers;
using ESDWiki2.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class TeamCategoriesController : ControllerBase
    {
        private readonly IWikiRepository repository;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly WikiContext appDbContext;

        public TeamCategoriesController(IWikiRepository repository, UserManager<ApplicationUser> userManager, WikiContext appDbContext)
        {
            this.repository = repository;
            this.userManager = userManager;
            this.appDbContext = appDbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TeamCategory>> Get()
        {
            try
            {
                return Ok(repository.GetAllTeamCategories());
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest("Failed to get team categories");
            }
        }

        [HttpPost]
        [Authorize(Policy = "ESDAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Post([FromBody]TeamCategoryViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newCategory = new TeamCategory()
                    {
                        Name = model.Name
                    };

                    repository.AddTeamCategory(newCategory);
                    if (repository.SaveAll())
                    {
                        return Ok("New team category has been saved");
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
            return BadRequest("Failed to save new team category");
        }

        [HttpPost("{id:int}")]
        [Authorize(Policy = "ESDAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Edit([FromBody]TeamCategoryViewModel model, int id)
        {
            Console.WriteLine("Trying to update team category");
            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState is not valid");
                return BadRequest(ModelState);
            }

            var category = repository.GetTeamCategoryById(id);
            if (category != null)
            {
                category.Name = model.Name;
                if (repository.SaveAll())
                {
                    return new OkObjectResult("Successfully saved category inside");
                }
            }

            Console.WriteLine("Successfully saved category outside");
            return new OkObjectResult("Successfully saved category outside");
        }

        [HttpDelete("{id:int}")]
        [Authorize(Policy = "ESDAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Delete(int id)
        {
            if(id <= 0)
            {
                return BadRequest("Not a valid category ID");
            }
            var category = repository.GetTeamCategoryById(id);
            appDbContext.Remove(category);
            if (category != null)
            {
                if (repository.SaveAll())
                {
                    return new OkObjectResult("Successfully deleted category");
                }
            }
            return BadRequest("Could not delete category");
        }
    }
}
