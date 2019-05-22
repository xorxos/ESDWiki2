using ESDWiki2.Data;
using ESDWiki2.Data.Entities;
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

        public WikiCategoriesController(IWikiRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<WikiCategory>> Get()
        {
            try
            {
                Console.WriteLine(repository.GetAllWikiCategories());
                return Ok(repository.GetAllWikiCategories());
            }
            catch(Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest("Failed to get categories");
            }
        }
    }
}
