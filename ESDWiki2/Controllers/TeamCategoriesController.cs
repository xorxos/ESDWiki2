using ESDWiki2.Data;
using ESDWiki2.Data.Entities;
using ESDWiki2.Helpers;
using ESDWiki2.ViewModels;
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
        public IActionResult Post([FromBody]TeamCategoryViewModel model)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var newCategory = new TeamCategory()
                    {
                        Name = model.Name,
                        CategoryUrl = model.CategoryUrl,
                        ImageUrl = model.ImageUrl
                    };

                    repository.AddTeamCategory(newCategory);
                    if(repository.SaveAll())
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

        [HttpPost("{originalCategory}")]
        public IActionResult Edit([FromBody]TeamCategoryViewModel model, string originalCategory)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("ModelState is not valid");
                    return BadRequest(ModelState);
                }

                var category = repository.GetTeamCategoryByName(originalCategory);
                if (category != null)
                {
                    category.Name = model.Name;
                    Console.WriteLine(category.Name);
                    appDbContext.SaveChanges();
                    return new OkObjectResult("Successfully saved category");
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest($"Failed to save category: {exception}");
            }
            Console.WriteLine("Successfully saved category outside");
            return new OkObjectResult("Successfully saved category outside");
        }
    }
}
