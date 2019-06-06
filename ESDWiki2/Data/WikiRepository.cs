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

        public void UpdateEntity(object model)
        {
            ctx.Update(model);
        }

        public IEnumerable<Article> GetAllArticles()
        {
            return ctx.Articles
                .Include(a => a.ArticleItems)
                .ThenInclude(ai => ai.ListContents)
                .Include(o => o.WikiCategories)
                .Include(o => o.TeamCategories)
                .ToList();
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

        public WikiCategory GetWikiCategoryByName(string name)
        {
            return ctx.WikiCategories
                .Where(c => c.Name == name)
                .FirstOrDefault();
        }

        public Article GetArticleById(int id)
        {
            return ctx.Articles
                .Where(c => c.Id == id)
                .Include(a => a.ArticleItems)
                .ThenInclude(ai => ai.ListContents)
                .Include(o => o.WikiCategories)
                .Include(o => o.TeamCategories)
                .FirstOrDefault();
        }

        public TeamCategory GetTeamCategoryById(int id)
        {
            return ctx.TeamCategories
                .Where(c => c.Id == id)
                .FirstOrDefault();
        }

        public WikiCategory GetWikiCategoryById(int id)
        {
            return ctx.WikiCategories
                .Where(c => c.Id == id)
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
