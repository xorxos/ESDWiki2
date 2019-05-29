using AutoMapper;
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
    [Route("/api/[controller]")]
    public class ArticleController: Controller
    {
        private readonly WikiContext _appDbContext;
        private readonly IWikiRepository repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public ArticleController(UserManager<ApplicationUser> userManager, IMapper mapper, WikiContext appDbContext, IWikiRepository repository)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
            this.repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Article>> Get()
        {
            try
            {
                return Ok(repository.GetAllArticles());
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest("Failed to get articles");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Article model)
        {
            try
            {
                Console.WriteLine("Article Model State Valid?: " + ModelState.IsValid);
                if (ModelState.IsValid)
                {
                    repository.AddEntity(model);
                    if (repository.SaveAll())
                    {
                        return Ok("New article has been saved");
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
            return BadRequest("Failed to save new article: " + ModelState.Values);
        }

        [HttpPost("{id:int}")]
        public async Task<IActionResult> Edit([FromBody]Article model, int id)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState is not valid");
                return BadRequest(ModelState);
            }

            var article = repository.GetArticleById(id);
            if (article != null)
            {
                article.Title = model.Title;
                article.Description = model.Description;
                article.ArticleItems = model.ArticleItems;
                article.TeamCategories = model.TeamCategories;
                article.WikiCategories = model.WikiCategories;
                var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                article.User = currentUser;
                article.LastUpdateUser = currentUser;
                if (repository.SaveAll())
                {
                    return new OkObjectResult("Successfully saved article");
                }
            }
            
            return new OkObjectResult("Successfully saved article");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Not a valid article ID");
            }
            var article = repository.GetArticleById(id);
            _appDbContext.Remove(article);
            if (article != null)
            {
                if (repository.SaveAll())
                {
                    return new OkObjectResult("Successfully deleted article");
                }
            }
            return BadRequest("Could not delete article");
        }
    }
}
