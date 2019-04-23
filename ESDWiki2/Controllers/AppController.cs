using ESDWiki2.Data;
using Microsoft.AspNetCore.Mvc;

namespace ESDWiki.Controllers
{
    public class AppController : Controller
    {
        private readonly WikiContext _context;
        private readonly IWikiRepository repository;

        public AppController(WikiContext context, IWikiRepository repository)
        {
            _context = context;
            this.repository = repository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Shop()
        {
            return View();
        }
    }
}
