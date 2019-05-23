using ESDWiki2.Data;
using ESDWiki2.Data.Entities;
using ESDWiki2.ViewModels;
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

        public TeamCategoriesController(IWikiRepository repository)
        {
            this.repository = repository;
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
    }
}
