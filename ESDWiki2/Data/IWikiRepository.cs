using System.Collections.Generic;
using ESDWiki2.Data.Entities;

namespace ESDWiki2.Data
{
    public interface IWikiRepository
    {
        void AddEntity(object model);
        void AddTeamCategory(TeamCategory teamCategory);
        IEnumerable<Article> GetAllArticles();
        IEnumerable<TeamCategory> GetAllTeamCategories();
        IEnumerable<WikiCategory> GetAllWikiCategories();
        Article GetArticleById(int id);
        TeamCategory GetTeamCategoryById(int id);
        TeamCategory GetTeamCategoryByName(string name);
        WikiCategory GetWikiCategoryById(int id);
        WikiCategory GetWikiCategoryByName(string name);
        bool SaveAll();
        void UpdateEntity(object model);
    }
}