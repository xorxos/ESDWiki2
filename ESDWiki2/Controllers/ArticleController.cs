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
    public class ArticleController : Controller
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
        public IActionResult Edit([FromBody]Article model, int id)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState is not valid");
                return BadRequest(ModelState);
            }

            var article = repository.GetArticleById(id);
            if (article != null)
            {
                //Delete article children entities
                foreach (var articleItem in article.ArticleItems.ToList())
                {
                    foreach (var listContent in articleItem.ListContents)
                    {
                        _appDbContext.Remove(listContent);
                    }
                    _appDbContext.ArticleItems.Remove(articleItem);
                }
                foreach (var wikiCategory in article.WikiCategories)
                {
                    _appDbContext.Remove(wikiCategory);
                }
                foreach (var teamCategory in article.TeamCategories)
                {
                    _appDbContext.Remove(teamCategory);
                }
                repository.SaveAll();
                _appDbContext.Articles.Remove(article);
                repository.SaveAll();

                //Remove the ID's for article and children entities
                model.Id = 0;

                if (model.ArticleItems.ToList().Count > 0)
                {
                    for (var i = 0; i < model.ArticleItems.ToList().Count; i++)
                    {
                        var articleItems = model.ArticleItems.ToList();
                        articleItems[i].Id = 0;
                        if(articleItems[i].ListContents != null)
                        {
                            for (var i2 = 0; i2 < articleItems[i].ListContents.ToList().Count; i2++)
                            {
                                var listContent = articleItems[i].ListContents.ToList();
                                if (listContent[i2] != null)
                                {
                                    listContent[i2].Id = 0;
                                }
                            }
                        }
                    }
                }

                foreach (var category in model.WikiCategories.ToList())
                {
                    category.Id = 0;
                }
                foreach (var category in model.TeamCategories.ToList())
                {
                    category.Id = 0;
                }

                //Add new article
                repository.AddEntity(model);
                if (repository.SaveAll())
                {
                    return new OkObjectResult("Successfully saved article");
                }
                else
                {
                    repository.AddEntity(article);
                    repository.SaveAll();
                    return BadRequest("Could not save new article.");
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
