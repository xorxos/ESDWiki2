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
    }
}
