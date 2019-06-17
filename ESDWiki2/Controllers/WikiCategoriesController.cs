using ESDWiki2.Data;
using ESDWiki2.Data.Entities;
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
    public class WikiCategoriesController : ControllerBase
    {
        private readonly IWikiRepository repository;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly WikiContext wikiContext;

        public WikiCategoriesController(IWikiRepository repository, UserManager<ApplicationUser> userManager, WikiContext wikiContext)
        {
            this.repository = repository;
            this.userManager = userManager;
            this.wikiContext = wikiContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<WikiCategory>> Get()
        {
            try
            {
                return Ok(repository.GetAllWikiCategories());
            }
            catch(Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest("Failed to get categories");
            }
        }

        [HttpPost]
        [Authorize(Policy = "ESDAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Post([FromBody]WikiCategoryViewModel model)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var newCategory = new WikiCategory()
                    {
                        Name = model.Name,
                        CategoryUrl = model.CategoryUrl,
                        ImageUrl = model.ImageUrl,
                        ImagePlaceholder = model.ImagePlaceholder,
                        ImageName = model.ImageName,
                        ImagePath = model.ImagePath
                    };

                    repository.AddEntity(newCategory);
                    if (repository.SaveAll())
                    {
                        return Ok("New wiki category has been saved");
                    }
                    else
                    {
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
            return BadRequest("Failed to save new wiki category");
        }

        [HttpPost("{id:int}")]
        [Authorize(Policy = "ESDAdmin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Edit([FromBody]WikiCategoryViewModel model, int id)
        {
            Console.WriteLine("Trying to update wiki category");
            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState is not valid");
                return BadRequest(ModelState);
            }

            var category = repository.GetWikiCategoryById(id);
            if (category != null)
            {
                category.Name = model.Name;
                category.CategoryUrl = model.CategoryUrl;
                category.ImageUrl = model.ImageUrl;
                category.ImagePlaceholder = model.ImagePlaceholder;
                category.ImageName = model.ImageName;
                category.ImagePath = model.ImagePath;
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
            if (id <= 0)
            {
                return BadRequest("Not a valid category ID");
            }
            var category = repository.GetWikiCategoryById(id);
            wikiContext.Remove(category);
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
