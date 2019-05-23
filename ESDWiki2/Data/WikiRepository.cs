using ESDWiki2.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Data
{
    public class WikiRepository : IWikiRepository
    {
        private readonly WikiContext ctx;

        public WikiRepository(WikiContext ctx)
        {
            this.ctx = ctx;
        }

        public void AddEntity(object model)
        {
            ctx.Add(model);
        }

        public IEnumerable<Article> GetAllArticles(bool includeItems)
        {
            return null;
        }
        
        public IEnumerable<WikiCategory> GetAllWikiCategories()
        {
            return ctx.WikiCategories
                      .OrderBy(c => c.Name)
                      .ToList();
        }

        public IEnumerable<TeamCategory> GetAllTeamCategories()
        {
            return ctx.TeamCategories
                      .OrderBy(c => c.Name)
                      .ToList();
        }

        public TeamCategory GetTeamCategoryByName(string name)
        {
            return ctx.TeamCategories
                .Where(c => c.Name == name)
                .FirstOrDefault();
        }

        public void AddTeamCategory(TeamCategory teamCategory)
        {
            AddEntity(teamCategory);
        }

        public bool SaveAll()
        {
            return ctx.SaveChanges() > 0;
        }
    }
}
